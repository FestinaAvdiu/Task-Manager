# Task Manager

**Task Manager** is a SvelteKit-based web application that allows users to manage their daily tasks in an organized and intuitive way. It features motivational quotes to inspire users and a categorized task system that helps them stay on top of their goals.

---

## Purpose of the Project

The purpose of this project is to build a complete web application using the SvelteKit framework. This includes working with routes, components, APIs (both internal and external), server-side data storage, and clean UI/UX design.

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
│   │   ├── +page.svelte            ## TASKS PAGE
│   │   ├── add/
│   │   │   └── +page.svelte        ## ADD TASKS PAGE
│   │   └── [id]/
│   │       ├── +page.svelte        ## TASKS DETAILS PAGE
│   │       └── edit/
│   │           └── +page.svelte    ## EDIT TASKS PAGE
│   ├── +page.svelte                ## HOMEPAGE
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

### Internal & External APIs

| **Endpoint**                   | **HTTP Method** | **Description**                                                                                          |
|--------------------------------|-----------------|----------------------------------------------------------------------------------------------------------|
| `/api/tasks`                   | `GET`           | Fetches all tasks from the database. Returns a list of tasks.                                              |
| `/api/tasks`                   | `PATCH`         | Updates the status of a task (e.g., toggling between "done" and "todo"). Takes task ID via query params. |
| `/api/tasks/[id]`              | `GET`           | Fetches a single task based on its ID. Returns details of a specific task.                                 |
| `/api/tasks/[id]`              | `DELETE`        | Deletes a specific task based on its ID. Returns success or error status based on deletion success.        |
| `/api/tasks/[id]`              | `PATCH`         | Updates a specific task by ID with the provided data (e.g., title, description, priority, status).         |
| `/api/tasks/add`               | `POST`          | Creates a new task by inserting it into the database with provided data (title, description, etc.).         |
| `/api/quote`                   | `GET`           | Fetches a random motivational quote and its author from the Quotable API.                                  |


---

## Data Model

All tasks are stored in a SQLite database. Each task includes the following fields:

- `id`: number 
- `title`: string 
- `description`: string 
- `dueDate`: string (YYYY-MM-DD format)
- `priority`: string (low, medium, high)
- `status`: string (incomplete or complete)


