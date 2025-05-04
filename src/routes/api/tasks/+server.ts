import { db } from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';

// GET: Fetch all tasks
export async function GET() {
	try {
		const tasks = await db.all('SELECT * FROM tasks');
		return new Response(JSON.stringify(tasks), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch tasks', { status: 500 });
	}
}

// PATCH: Update task status (mark as done or to-do)
export async function PATCH(event: RequestEvent) {
	const id = event.url.searchParams.get('id');

	try {
		// Toggle the task status between "done" and "todo"
		await db.run(`
        UPDATE tasks
        SET status = CASE WHEN status = 'done' THEN 'todo' ELSE 'done' END
        WHERE id = ?`, id);

		return new Response('Task status updated successfully', { status: 200 });
	} catch (error) {
		return new Response('Failed to update task status', { status: 500 });
	}
}