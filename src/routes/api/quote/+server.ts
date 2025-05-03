import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({}: RequestEvent) {
	try {
		// Fetch random quote from Quotable API
		const res = await fetch('http://api.quotable.io/random');

		if (!res.ok) {
			return new Response('Error fetching quote', { status: 500 });
		}

		const data = await res.json();

		// Extract the quote and author from the API response
		const quote = data.content;
		const author = data.author;

		const result = {
			quote,
			author
		};

		return json(result);
	} catch (error) {
		return new Response('Failed to fetch quote', { status: 500 });
	}
}