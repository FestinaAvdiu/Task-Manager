<script lang="ts">
	export let label: string;
	export let count: number;
</script>

<style>
    .badge {
        background-color: #ff6b6b;
        color: white;
        padding: 6px 12px;
        border-radius: 12px;
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
</style>

<div class="badge">
	<span>{label}</span>
	<span>{count}</span>
</div>

