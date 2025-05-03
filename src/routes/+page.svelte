<script lang="ts">
	let quote: string = '';
	let author: string = '';
	let loading = true;

	// Fetch quote on load
	const loadQuote = async () => {
		try {
			const res = await fetch('/api/quote');
			const data = await res.json();
			quote = data.quote;
			author = data.author;
		} catch (err) {
			quote = 'Failed to load quote.';
			author = 'System';
		} finally {
			loading = false;
		}
	};

	loadQuote();
</script>

<style>
    :global(html, body) {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }

    .home-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #0d1b2a;
        color: white;
    }

    .page {
        text-align: center;
        padding: 2rem;
    }

		.welcome-message {
        font-size: 2.5rem;
        font-weight: bold;
        color: peachpuff;
        margin-bottom: 1rem;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-display: swap;
    }

    .quote-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        max-width: 600px;
    }

    h2 {
        font-size: 2rem;
        font-style: italic;
        color: #fff;
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-display: swap;
    }

    .author {
        font-size: 1.25rem;
        margin-top: 0.5rem;
        margin-bottom: 5rem;
        font-style: italic;
        color: #9db4c0;
    }

    .button {
        background-color: mediumslateblue;
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.25rem;
        cursor: pointer;
        border-radius: 5px;
        margin-top: 3rem;
        transition: background-color 0.3s ease;
    }

    .button:hover {
        background-color: #ff9f43;
    }
</style>

<div class="home-wrapper">
	<div class="page">
		<h1 class="welcome-message">Welcome to your Task Manager</h1>
		{#if loading}
			<h2>Loading quote...</h2>
		{:else}
			<div class="quote-container">
				<h2>"{quote}"</h2>
				<p class="author">— {author}</p>
			</div>
		{/if}
		<a href="/tasks" class="button">Go to Tasks</a>
	</div>
</div>