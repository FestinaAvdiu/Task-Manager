<script lang="ts">
  export let priority: 'low' | 'medium' | 'high';

  const getColor = () => {
    switch (priority) {
      case 'high':
        return { backgroundColor: '#f44336', color: 'white' }; // Red
      case 'medium':
        return { backgroundColor: '#ffeb3b', color: 'black' }; // Yellow
      case 'low':
        return { backgroundColor: '#4caf50', color: 'white' }; // Green
      default:
        return { backgroundColor: '#9e9e9e', color: 'black' }; // Gray
    }
  };
</script>

<span
  class="priority-badge"
  style="background-color: {getColor().backgroundColor}; color: {getColor().color};"
>
  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
</span>

<style>
  .priority-badge {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 9999px;
    font-weight: bold;
  }
</style>


