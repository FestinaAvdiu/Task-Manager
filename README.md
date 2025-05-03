# Task Manager

**Task Manager** is a SvelteKit-based web application that allows users to manage their daily tasks in an organized and intuitive way. It features motivational quotes to inspire users and a categorized task system that helps them stay on top of their goals.

---

## Purpose of the Project

The purpose of this project is to demonstrate the ability to independently build a complete web application using the SvelteKit framework. This includes working with routes, components, APIs (both internal and external), server-side data storage, and clean UI/UX design.

---

## Features

- View motivational quotes on the homepage (fetched from an external API)
- View all tasks categorized as:
  - Completed
  - Today
  - Overdue
  - Future
- Add new tasks with title, description, due date, priority, and status
- Edit existing tasks
- Mark tasks as complete or incomplete
- Delete tasks
- See a notification badge showing how many tasks are left to do

---

## Project Structure

```text
src/
├── lib/
│   ├── components/
│   │   ├── Footer.svelte
│   │   ├── Navbar.svelte
│   │   ├── NotificationBadge.svelte
│   │   ├── PriorityBadge.svelte
│   │   ├── StatusBadge.svelte
│   │   ├── TaskCard.svelte
│   │   ├── TaskEdit.svelte
│   │   └── TaskForm.svelte
│   └── db.ts
│
├── routes/
│   ├── api/
│   │   ├── quote/
│   │   │   └── +server.ts
│   │   └── tasks/
│   │       ├── +server.ts
│   │       ├── add/
│   │       │   └── +server.ts
│   │       └── [id]/
│   │           └── +server.ts
│   ├── tasks/
│   │   ├── +page.svelte
│   │   ├── add/
│   │   │   └── +page.svelte
│   │   └── [id]/
│   │       ├── +page.svelte
│   │       └── edit/
│   │           └── +page.svelte
│   ├── +page.svelte
│   └── +layout.svelte
│
└── database.db

```

---

## Technologies Used

- SvelteKit 
- SQLite 
- TypeScript
- Svelte stores and props for component communication

---

## API Endpoints

### External API
- `GET /api/quote` – Fetches a motivational quote from Quotable API

### Internal APIs

| Endpoint                  | Method | Description                     |
|---------------------------|--------|---------------------------------|
| `/api/tasks`              | GET    | Fetch all tasks                 |
| `/api/tasks/add`          | POST   | Add a new task                  |
| `/api/tasks/[id]`         | GET    | Fetch task by ID                |
| `/api/tasks/[id]`         | PATCH  | Update a task by ID             |
| `/api/tasks/[id]`         | DELETE | Delete a task by ID             |

---

## Data Model

All tasks are stored in a SQLite database. Each task includes the following fields:

- `id`: number 
- `title`: string 
- `description`: string 
- `dueDate`: string (YYYY-MM-DD format)
- `priority`: string (low, medium, high)
- `status`: string (incomplete or complete)


