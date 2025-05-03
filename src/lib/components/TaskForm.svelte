<script lang="ts">
	import { goto } from '$app/navigation';

	let title: string = '';
	let description: string = '';
	let due_date: string = '';
	let priority: string = 'medium';

	const isValidForm = () => {
		return Boolean(title.trim() && description.trim() && due_date.trim() && priority.trim());
	};


	const saveTask = async () => {
		if (!isValidForm()) {
			console.error('All fields are required');
			return;
		}

		const response = await fetch('/api/tasks/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, description, due_date, priority })
		});

		if (response.ok) {
			await goto('/tasks');
		} else {
			console.error('Failed to save task');
		}
	};
</script>

<form class="form-container" on:submit|preventDefault={saveTask}>
	<h2>Create Task</h2>

	<label for="title">Title</label>
	<input type="text" id="title" bind:value={title} required />

	<label for="description">Description</label>
	<textarea id="description" rows="4" bind:value={description} required></textarea>

	<label for="due_date">Due Date</label>
	<input type="date" id="due_date" bind:value={due_date} required />

	<label for="priority">Priority</label>
	<select id="priority" bind:value={priority} required>
		<option value="high">High</option>
		<option value="medium">Medium</option>
		<option value="low">Low</option>
	</select>

	<button type="submit">Save</button>
</form>

<style>
    .form-container {
        background-color: #1e1e1e;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
        color: #fff;
        width: 100%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    h2 {
        text-align: center;
        margin-bottom: 10px;
    }

    label {
        font-weight: bold;
    }

    input,
    textarea,
    select {
        padding: 10px;
        border-radius: 6px;
        border: none;
        background-color: #2f2f2f;
        color: #fff;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
    }

    input:focus,
    textarea:focus,
    select:focus {
        outline: none;
        box-shadow: 0 0 0 2px #90ee90;
    }

    button {
        background-color: #4caf50;
        color: white;
        padding: 12px;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #388e3c;
    }
</style>
