<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import TaskEdit from '$lib/components/TaskEdit.svelte';

	let task: any = null;
	let taskId: string = "";

	const fetchTask = async (id: string) => {
		const response = await fetch(`/api/tasks/${id}`);
		if (response.ok) {
			task = await response.json();
		} else {
			console.error('Failed to fetch task');
		}
	};

	onMount(() => {
		taskId = page.params.id;
		fetchTask(taskId);
	});
</script>

<div class="edit-page-container">
	{#if task}
		<TaskEdit {task} />
	{:else}
		<p class="loading-text">Loading task...</p>
	{/if}
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: #0d1b2a;
        color: #f0f0f0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .edit-page-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        background-color: #0d1b2a;
    }

    .loading-text {
        color: #f0f0f0;
        font-size: 1.2rem;
    }
</style>