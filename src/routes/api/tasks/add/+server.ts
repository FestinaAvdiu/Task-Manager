import { db } from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
	const { title, description, due_date, priority } = await event.request.json();

	// Basic validation
	if (!title || !description || !due_date || !priority) {
		return new Response('Missing required fields', { status: 400 });
	}

	try {
		// Insert the new task into the database
		const result = await db.run(
			'INSERT INTO tasks (title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?)',
			[title, description, due_date, priority, 'pending']
		) as unknown as { lastInsertRowId: number };

		return new Response(JSON.stringify({ id: result.lastInsertRowId }), {
			status: 201
		});

	} catch (error) {
		console.error('Error creating task:', error);
		return new Response('Failed to create task', { status: 500 });
	}
}
