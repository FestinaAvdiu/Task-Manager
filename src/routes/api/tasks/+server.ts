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

// POST: Create a new task
export async function POST(event: RequestEvent) {
	const data = await event.request.json();

	try {
		const { title, description, due_date, priority } = data;

		const result = await db.run(
			'INSERT INTO tasks (title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?)',
			title,
			description,
			due_date,
			priority,
			'todo'
		);

		return new Response(JSON.stringify({ message: 'Task created successfully', id: result.lastID }), {
			status: 201
		});
	} catch (error) {
		console.error('Error creating task:', error);
		return new Response('Failed to create task', { status: 500 });
	}
}


// DELETE: Delete a task by ID
export async function DELETE(event: RequestEvent) {
	const id = event.url.searchParams.get('id');

	try {
		// Delete the task by ID
		await db.run('DELETE FROM tasks WHERE id = ?', id);
		return new Response('Task deleted successfully', { status: 200 });
	} catch (error) {
		return new Response('Failed to delete task', { status: 500 });
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