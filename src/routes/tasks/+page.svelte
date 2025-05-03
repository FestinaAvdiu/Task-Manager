<script lang="ts">
	import { onMount } from "svelte";
	import NotificationBadge from '$lib/components/NotificationBadge.svelte';

	let tasks: any[] = [];
	let todoCount: number = 0;

	const categorizeTasks = (task: any) => {
		const today = new Date();
		const dueDate = new Date(task.due_date);
		const isDone = task.status === 'done';
		const todayStr = today.toISOString().split('T')[0];
		const dueStr = dueDate.toISOString().split('T')[0];
		if (isDone) return 'completed';
		if (dueStr === todayStr) return 'today';
		if (dueDate < today) return 'overdue';
		return 'future';
	};

	const fetchTasks = async () => {
		const response = await fetch('/api/tasks');
		if (response.ok) {
			const data = await response.json();
			tasks = data.map((task: any) => ({
				...task,
				category: categorizeTasks(task)
			}));
			todoCount = tasks.filter(task => task.status !== 'done').length;
		} else {
			console.error('Failed to fetch tasks');
		}
	};

	// Toggle completion status with optimistic update
	const toggleTaskStatus = async (taskId: number, currentStatus: string) => {
		tasks = tasks.map(task =>
			task.id === taskId
				? { ...task, status: currentStatus === 'done' ? 'todo' : 'done', category: categorizeTasks({ ...task, status: currentStatus === 'done' ? 'todo' : 'done' }) }
				: task
		);
		// Update todoCount
		todoCount = tasks.filter(task => task.status !== 'done').length;

		// Send the update to the server
		const response = await fetch(`/api/tasks?id=${taskId}`, {
			method: 'PATCH',
		});

		if (!response.ok) {
			console.error('Failed to update task status on server. Reverting.');
			// Revert the local state on error by refetching
			await fetchTasks();
		}
	};

	onMount(() => {
		fetchTasks();
	});
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: #0d1b2a;
        color: #f0f0f0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .task-board {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
        padding: 40px;
        box-sizing: border-box;
        flex-wrap: wrap;
    }

    .task-column {
        flex: 1;
        padding: 20px;
        background-color: #000;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
    }

    .task-header {
        font-weight: bold;
        font-size: 1.5rem;
        margin-bottom: 15px;
        color: #ddd;
        text-align: center;
    }

    .task {
        background-color: #2f2f2f;
        color: #fff;
        padding: 14px;
        margin: 12px 0;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        transition: transform 0.2s ease;
    }

    .task:hover {
        transform: translateY(-2px);
    }

    .task.completed {
        background-color: #444;
        text-decoration: line-through;
    }

    .task input[type="checkbox"] {
        margin-right: 10px;
        transform: scale(1.2);
        cursor: pointer;
    }

    .task a {
        background-color: #0077b6;
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    .task a:hover {
        background-color: #023e8a;
    }

    .task-footer {
        margin-top: 30px;
        text-align: center;
    }

    .task-footer a button {
        background-color: #4caf50;
        color: white;
        padding: 12px 20px;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .task-footer a button:hover {
        background-color: #388e3c;
    }
</style>

<div class="task-board">
	<NotificationBadge label="To do tasks left:" count={todoCount} />

	<div class="task-column">
		<div class="task-header">Today</div>
		{#each tasks.filter(task => task.category === 'today') as task (task.id)}
			<div class="task {task.status}">
				<input type="checkbox" checked={task.status === 'done'} on:change={() => toggleTaskStatus(task.id, task.status)} />
				<span>{task.title}</span>
				<a href={`/tasks/${task.id}`}>View</a>
			</div>
		{/each}
	</div>

	<div class="task-column">
		<div class="task-header">Overdue</div>
		{#each tasks.filter(task => task.category === 'overdue') as task (task.id)}
			<div class="task {task.status}">
				<input type="checkbox" checked={task.status === 'done'} on:change={() => toggleTaskStatus(task.id, task.status)} />
				<span>{task.title}</span>
				<a href={`/tasks/${task.id}`}>View</a>
			</div>
		{/each}
	</div>

	<div class="task-column">
		<div class="task-header">Future</div>
		{#each tasks.filter(task => task.category === 'future') as task (task.id)}
			<div class="task {task.status}">
				<input type="checkbox" checked={task.status === 'done'} on:change={() => toggleTaskStatus(task.id, task.status)} />
				<span>{task.title}</span>
				<a href={`/tasks/${task.id}`}>View</a>
			</div>
		{/each}
	</div>

	<div class="task-column">
		<div class="task-header">Completed</div>
		{#each tasks.filter(task => task.category === 'completed') as task (task.id)}
			<div class="task {task.status}">
				<input type="checkbox" checked={task.status === 'done'} on:change={() => toggleTaskStatus(task.id, task.status)} />
				<span>{task.title}</span>
				<a href={`/tasks/${task.id}`}>View</a>
			</div>
		{/each}
	</div>
</div>

<div class="task-footer">
	<a href="/tasks/add">
		<button>Add Task</button>
	</a>
</div>