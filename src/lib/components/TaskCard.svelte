<script lang="ts">
	import PriorityBadge from '$lib/components/PriorityBadge.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';

	export let task: any;
	export let onDelete: () => void;
	export let onEdit: () => void;
	export let onToggleStatus: () => void;
</script>

<style>
    .task-card {
        background-color: #000;
        color: #fff;
        padding: 25px;
        margin: 40px auto;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        max-width: 500px;
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .task-header {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
    }

    .task-details {
        font-size: 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .task-details div {
        margin-bottom: 10px;
    }

    .badges-row {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-top: 10px;
    }

    .task-footer {
        display: flex;
        justify-content: space-between;
        gap: 15px;
        align-items: center;
    }

    .task-footer button {
        padding: 10px 14px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-weight: bold;
        width: 100%;
    }

    .task-footer button:hover {
        opacity: 0.85;
    }

    .task-footer button.delete {
        background-color: #dc3545;
    }

    .task-footer button.edit {
        background-color: #28a745;
    }

    .task-footer button.complete {
        background-color: #ffc107;
        color: #000;
    }

    @media (min-width: 768px) {
        .task-footer button {
            width: auto;
        }
    }

</style>

<div class="task-card">
	<!-- Task Header with Title -->
	<div class="task-header">{task.title}</div>

	<!-- Task Details Section -->
	<div class="task-details">
		<div><strong>Due Date:</strong> {task.due_date}</div>
		<div><strong>Description:</strong> {task.description}</div>
		<div class="badges-row">
			<span><strong>Priority:</strong> <PriorityBadge priority={task.priority} /></span>
			<span><strong>Status:</strong> <StatusBadge status={task.status} /></span>
		</div>
	</div>


	<!-- Task Footer with Buttons -->
	<div class="task-footer">
		<button class="edit" on:click={onEdit}>Edit</button>
		<button class="delete" on:click={onDelete}>Delete</button>
		<button class="complete" on:click={onToggleStatus}>
			{task.status === 'done' ? 'Mark Incomplete' : 'Mark Complete'}
		</button>
	</div>
</div>





