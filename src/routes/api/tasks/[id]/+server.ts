import { db } from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET(event: RequestEvent) {
	const taskId = event.params.id;

	try {
		const task = await db.get('SELECT * FROM tasks WHERE id = ?', taskId);
		if (task) {
			return new Response(JSON.stringify(task), { status: 200 });
		} else {
			return new Response('Task not found', { status: 404 });
		}
	} catch (error) {
		return new Response('Failed to fetch task', { status: 500 });
	}
}

export async function DELETE(event: RequestEvent) {
	const taskId = event.params.id;

	try {
		const result = await db.run('DELETE FROM tasks WHERE id = ?', taskId);

		// Ensuring the result is defined and result.changes is valid
		if (result && typeof result.changes === 'number' && result.changes > 0) {
			return new Response('Task deleted successfully', { status: 200 });
		} else {
			return new Response('Task not found', { status: 404 });
		}
	} catch (error) {
		return new Response('Failed to delete task', { status: 500 });
	}
}

export async function PATCH(event: RequestEvent) {
	const taskId = event.params.id;

	try {
		const existingTask = await db.get('SELECT * FROM tasks WHERE id = ?', taskId);
		if (!existingTask) {
			return new Response('Task not found', { status: 404 });
		}

		const updatedTask = await event.request.json();

		const result = await db.run(
			'UPDATE tasks SET title = ?, description = ?, due_date = ?, priority = ?, status = ? WHERE id = ?',
			[
				updatedTask.title ?? existingTask.title,
				updatedTask.description ?? existingTask.description,
				updatedTask.due_date ?? existingTask.due_date,
				updatedTask.priority ?? existingTask.priority,
				updatedTask.status ?? existingTask.status,
				taskId
			]
		);

		// Check if any rows were updated
		if (result && typeof result.changes === 'number' && result.changes > 0) {
			return new Response('Task updated successfully', { status: 200 });
		} else {
			// If no changes were made
			return new Response('Task updated successfully (no changes made)', { status: 200 });
		}
	} catch (error) {
		console.error('Error updating task:', error);
		return new Response('Failed to update task', { status: 500 });
	}
}