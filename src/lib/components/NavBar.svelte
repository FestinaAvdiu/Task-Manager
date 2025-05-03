<script lang="ts">
	import { page } from '$app/state';
</script>

<nav class="navbar">
	<div class="nav-links">
		<a href="/" class="nav-link" class:active={page.url.pathname === '/'}>Home</a>
		<a href="/tasks" class="nav-link" class:active={page.url.pathname === '/tasks'}>Tasks</a>
	</div>
</nav>

<style>
    .navbar {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #1e1e1e;
        color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }

    .nav-links {
        display: flex;
        gap: 1.5rem;
    }

    .nav-link {
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2rem;
        transition: color 0.3s;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-display: swap;
    }

    .nav-link:hover {
        color: #90ee90;
    }

    .nav-link.active {
        color: #90ee90;
    }
</style>