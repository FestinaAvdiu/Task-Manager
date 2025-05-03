<script lang="ts">
	import { onMount } from 'svelte';
	import TaskCard from '$lib/components/TaskCard.svelte';

	let task: any = null;

	// Fetch task's details
	const fetchTask = async (id: string) => {
		const response = await fetch(`/api/tasks/${id}`);
		if (response.ok) {
			task = await response.json();
		} else {
			console.error('Failed to fetch task');
		}
	};

	// Delete task
	const deleteTask = async () => {
		const response = await fetch(`/api/tasks/${task.id}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			window.location.href = '/tasks'; // Redirect after delete
		} else {
			console.error('Failed to delete task');
		}
	};

	// Toggle task status
	const toggleTaskStatus = async () => {
		const newStatus = task.status === 'done' ? 'incomplete' : 'done';
		const response = await fetch(`/api/tasks/${task.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status: newStatus }),
		});

		if (response.ok) {
			task.status = newStatus; // Update status locally
		} else {
			console.error('Failed to update task status');
		}
	};

	// Get task ID from URL and fetch it
	onMount(() => {
		const taskId = window.location.pathname.split('/').pop();
		fetchTask(taskId!);
	});
</script>

{#if task}
	<div class="page-center">
		<TaskCard
			{task}
			onDelete={deleteTask}
			onEdit={() => window.location.href = `/tasks/${task.id}/edit`}
			onToggleStatus={toggleTaskStatus}
		/>
	</div>
{:else}
	<p>Loading task...</p>
{/if}

<style>
    .page-center {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0d1b2a;
        padding: 1rem;
    }
</style>