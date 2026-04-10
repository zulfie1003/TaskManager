# TaskFlow — Task Manager App

A full-stack CRUD task manager built with **React** (frontend) and **Node.js + Express** (backend).

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, React Hooks, CSS3         |
| Backend   | Node.js, Express 4                  |
| Storage   | In-memory array (no DB required)    |
| IDs       | UUID v4                             |
| Docker    | Docker Compose (optional)           |

---

## Project Structure

```
task-manager/
├── backend/
│   ├── controllers/
│   │   └── task.controller.js   # Request handlers
│   ├── models/
│   │   └── task.model.js        # In-memory data store
│   ├── routes/
│   │   └── task.routes.js       # Express route definitions
│   ├── server.js                # App entry point
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTaskForm.js   # Form to create a task
│   │   │   ├── TaskItem.js      # Single task row (toggle, edit, delete)
│   │   │   └── TaskList.js      # List + filter tabs
│   │   ├── hooks/
│   │   │   └── useTasks.js      # All task state & API calls
│   │   ├── api.js               # Fetch wrapper for the REST API
│   │   ├── App.js               # Root component
│   │   ├── App.css              # All styles
│   │   └── index.js             # React entry point
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** v9+
- (Optional) **Docker** and **Docker Compose** for containerised setup

---

### Option A — Run Locally (recommended for development)

#### 1. Start the Backend

```bash
cd backend
npm install
npm start
# API running at http://localhost:3001
```

Use `npm run dev` instead of `npm start` if you have `nodemon` installed for hot-reload.

#### 2. Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
# App running at http://localhost:3000
```

The frontend `package.json` includes a `"proxy": "http://localhost:3001"` entry, so API calls work out of the box in development without CORS issues.

---

### Option B — Docker Compose

```bash
# From the project root
docker-compose up --build
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost:3000  |
| Backend  | http://localhost:3001  |

To stop: `docker-compose down`

---

## API Reference

Base URL: `http://localhost:3001`

### Endpoints

| Method | Path           | Description             | Body                     |
|--------|----------------|-------------------------|--------------------------|
| GET    | /tasks         | Get all tasks           | —                        |
| POST   | /tasks         | Create a task           | `{ "title": "string" }`  |
| PATCH  | /tasks/:id     | Update title/completed  | `{ "completed": bool }` or `{ "title": "string" }` |
| DELETE | /tasks/:id     | Delete a task           | —                        |
| GET    | /health        | Health check            | —                        |

### Response Shape

**Success:**
```json
{
  "success": true,
  "data": { "id": "...", "title": "...", "completed": false, "createdAt": "..." }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

### HTTP Status Codes

| Code | Meaning         |
|------|-----------------|
| 200  | OK              |
| 201  | Created         |
| 400  | Bad Request     |
| 404  | Not Found       |
| 500  | Internal Error  |

---

## Features

### Core CRUD
- ✅ Create tasks with title validation
- ✅ View all tasks (newest first)
- ✅ Mark tasks complete / incomplete (toggle)
- ✅ Delete tasks (with confirmation)

### Bonus Features
- ✅ **Edit task title** inline — click the ✎ pencil icon on any task
- ✅ **Filter tasks** — All / Active / Completed tabs with live counts
- ✅ **Progress bar** — shows completed/total at a glance
- ✅ **Docker support** — full-stack `docker-compose up`
- ✅ **Loading, error, and empty states** in the UI

---

## Assumptions

1. **No authentication** — this is a single-user local app.
2. **In-memory storage** — data resets when the server restarts. Swapping the model for a file-based or database store requires only changes to `backend/models/task.model.js`.
3. **No pagination** — acceptable at task-manager scale; easily added to `TaskModel.getAll()`.
4. **CORS is open** (`cors()` with no restrictions) — appropriate for local development. Lock it down for production.
5. Dates are formatted for the `en-IN` locale (day Month Year). Change the `toLocaleDateString` locale in `TaskItem.js` if needed.

---

## Environment Variables

### Backend
| Variable | Default | Description       |
|----------|---------|-------------------|
| PORT     | 3001    | API port          |

### Frontend
| Variable             | Default                  | Description        |
|----------------------|--------------------------|--------------------|
| REACT_APP_API_URL    | http://localhost:3001    | Backend API URL    |

Create a `.env` file in `frontend/` to override:
```
REACT_APP_API_URL=http://your-server:3001
```

---

## Extending the App

- **Persistent storage**: Replace the in-memory array in `task.model.js` with `fs`-based JSON reads/writes, or swap in SQLite / MongoDB with minimal controller changes.
- **Unit tests**: Add Jest + Supertest to the backend (`npm install --save-dev jest supertest`) and test each controller function.
- **Due dates / priority**: Add fields to `TaskModel.create()` and update the frontend form.
