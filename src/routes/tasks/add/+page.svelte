<script lang="ts">
	import TaskForm from '$lib/components/TaskForm.svelte';
</script>

<div class="add-page-container">
	<TaskForm />
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: #0d1b2a;
        color: #f0f0f0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .add-page-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        background-color: #0d1b2a;
    }
</style>