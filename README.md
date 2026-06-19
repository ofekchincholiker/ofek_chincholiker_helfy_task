# Task Manager App

A full-stack task management application built with React and Express.js.

## Setup and Installation

### Backend

1. cd backend
2. npm install
3. npm start (runs on port 4000)

### Frontend

1. cd frontend
2. npm install
3. npm start (runs on port 3000)

Make sure the backend is running before starting the frontend.

## API Endpoints

GET /api/tasks - Get all tasks

POST /api/tasks - Create a new task
Body: { title, description, priority }

PUT /api/tasks/:id - Update a task
Body: { title, description, completed, priority }

DELETE /api/tasks/:id - Delete a task

PATCH /api/tasks/:id/toggle - Toggle task completion status

## Task Model

{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  priority: 'low' | 'medium' | 'high'
}

## Design Decisions

- Used in-memory storage (array) for tasks as required, so data resets on server restart.
- The endless carousel duplicates the task list to create a seamless infinite loop using CSS animation.
- The number of duplicates adjusts dynamically based on screen width so the carousel always looks full even with few tasks.
- Default priority for new tasks is set to 'low'.
- The main app component is placed inside a folder called main-app-layout as required.
- All styles are written in plain CSS with no frameworks or preprocessors.

## Time Spent

- Backend: ~70 minutes
- Frontend components: ~100 minutes
- Styling: ~60 minutes
- Testing and fixes: ~30 minutes
