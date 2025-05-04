# Task Manager

**Task Manager** is a SvelteKit-based web application that allows users to manage their daily tasks in an organized and intuitive way. It features motivational quotes to inspire users and a categorized task system that helps them stay on top of their goals.

---

## Purpose of the Project

The purpose of this project is to build a complete web application using the SvelteKit framework. This includes working with routes, components, APIs (both internal and external), server-side data storage, and clean UI/UX design.

---

## Implementation

The application is built using **SvelteKit**, **SQLite**, and **TypeScript**. The project follows a structured approach to separate concerns:
1. **Frontend**: The UI is built using Svelte components, where tasks are displayed in a categorized system. Users can add, update, and delete tasks. 
2. **Backend**: The backend handles the task management logic, including CRUD operations, through API routes. The database (SQLite) stores tasks, and the app interacts with it via API calls.
3. **External API**: The motivational quote feature fetches quotes from an external API (Quotable API).

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


## Technologies Used

- SvelteKit 
- SQLite 
- TypeScript
- Svelte stores and props for component communication

---

## Project Structure

```text
src/
├── lib/                              
│   ├── components/                  
│   │   ├── Footer.svelte             ## Page footer
│   │   ├── Navbar.svelte             ## Navigation bar
│   │   ├── NotificationBadge.svelte  ## Shows number of incomplete tasks
│   │   ├── PriorityBadge.svelte      ## Visual indicator of task priority
│   │   ├── StatusBadge.svelte        ## Shows if task is complete/incomplete
│   │   ├── TaskCard.svelte           ## Card layout for individual task display
│   │   ├── TaskEdit.svelte           ## Task edit form UI
│   │   └── TaskForm.svelte           ## Task creation form UI
│   └── db.ts                         ## Initializes SQLite DB, creates schema, seeds default tasks
│
├── routes/                           
│   ├── api/                          
│   │   ├── quote/
│   │   │   └── +server.ts            ## External API Endpoint (quote fetching)
│   │   └── tasks/
│   │       ├── +server.ts            ## Handles GET all / PATCH status of tasks
│   │       ├── add/
│   │       │   └── +server.ts        ## Handles POST for new tasks
│   │       └── [id]/                 
│   │           └── +server.ts        ## Handles GET / PATCH / DELETE by task ID
│   |
│   ├── tasks/                        
│   │   ├── +page.svelte              ## TASKS PAGE – shows tasks by category
│   │   ├── add/
│   │   │   └── +page.svelte          ## ADD TASKS PAGE – form to create a new task
│   │   └── [id]/
│   │       ├── +page.svelte          ## TASK DETAILS PAGE – view task info
│   │       └── edit/
│   │           └── +page.svelte      ## EDIT TASKS PAGE – edit existing task
│   |
│   ├── +page.svelte                  ## HOMEPAGE – shows motivational quote
│   └── +layout.svelte                ## Layout wrapper for pages
│
├── app.d.ts                          
├── app.html                          
└── database.db                       ## SQLite Database File



```
---

## API Endpoints

### Internal & External APIs

| Endpoint                                | Method  | Description                                    |
|-----------------------------------------|---------|------------------------------------------------|
| `/api/tasks`                           | GET     | Fetch all tasks.                               |
| `/api/tasks`                           | PATCH   | Update task status (mark as done or to-do).    |
| `/api/tasks/[id]`                      | GET     | Fetch task details by ID.                     |
| `/api/tasks/[id]`                      | DELETE  | Delete task by ID.                            |
| `/api/tasks/[id]`                      | PATCH   | Update task details by ID.                    |
| `/api/tasks/add`                       | POST    | Create a new task.                            |
| `/api/quote`                           | GET     | Fetch a random motivational quote from Quotable API            |



---

## Data Model

All tasks are stored in a SQLite database. Each task includes the following fields:

| Field        | Type     | Description                              |
|--------------|----------|------------------------------------------|
| `id`         | INTEGER  | Unique task identifier (auto-incremented)|
| `title`      | TEXT     | Title of the task                        |
| `description`| TEXT     | Detailed description of the task         |
| `due_date`   | TEXT     | Due date in `YYYY-MM-DD` format          |
| `priority`   | TEXT     | Task priority (`low`, `medium`, `high`)  |
| `status`     | TEXT     | Task status (`todo` or `done`)           |


--- 

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18+)
- npm 
- SQLite

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/FestinaAvdiu/task-manager.git
   cd task-manager
3. **Install dependencies:**

   ```bash
   npm install
1. **Run the development server:**

   ```bash
   npm run dev

