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
