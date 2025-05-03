import * as fs from "fs";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

// Check if database exists
let exists = fs.existsSync("./src/database.db");

// Open SQLite connection
export const db = await open({
	filename: "./src/database.db",
	driver: sqlite3.Database
});

// If DB doesn't exist, create schema and seed data
if (!exists) {
	await db.exec(`
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        due_date TEXT, 
        priority TEXT,
        status TEXT
      )
	`);

	// Today tasks
	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const dd = String(today.getDate()).padStart(2, '0');
	const todayStr = `${yyyy}-${mm}-${dd}`;

	// Overdue tasks
	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);
	const yesterdayStr = yesterday.toISOString().split('T')[0];

	// Future: 3 days from now
	const future = new Date(today);
	future.setDate(today.getDate() + 3);
	const futureStr = future.toISOString().split('T')[0];

	await db.run(
		`INSERT INTO tasks (title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?)`,
		'Buy groceries', 'Get milk, bread, and eggs', todayStr, 'medium', 'todo'
	);

	await db.run(
		`INSERT INTO tasks (title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?)`,
		'Prepare for exam', 'Study chapters 4 to 7', yesterdayStr, 'high', 'todo'
	);

	await db.run(
		`INSERT INTO tasks (title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?)`,
		'Plan weekend trip', 'Find places to visit', futureStr, 'low', 'todo'
	);

	await db.run(
		`INSERT INTO tasks (title, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?)`,
		'Finish assignment', 'Complete the final report', todayStr, 'high', 'done'
	);
}
