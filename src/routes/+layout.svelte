<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="layout">
	<NavBar />
	<main class="content">
		<slot />
	</main>
	<Footer />
</div>

<style>
    .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
</style>