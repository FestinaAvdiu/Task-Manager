<script lang="ts">
	export let status: 'done' | 'incomplete';

	const getColor = () => {
		switch (status) {
			case 'done':
				return 'background-color: #4caf50; color: white;'; // Green
			case 'incomplete':
				return 'background-color: #ff9800; color: white;'; // Orange
			default:
				return 'background-color: gray; color: white;';
		}
	};
</script>

<span style="{getColor()}; padding: 0.3rem 0.6rem; border-radius: 0.5rem; font-size: 0.85rem; font-weight: bold;">
	{status === 'done' ? 'Completed' : 'Pending'}
</span>
