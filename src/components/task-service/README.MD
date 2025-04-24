# Task Management API

A RESTful API for managing tasks with authentication, filtering, and CRUD operations.

## Overview

This Task Management API allows agents to create, retrieve, update, and delete their tasks. The API includes authentication to ensure agents can only access and modify their own tasks, and provides filtering options to retrieve tasks based on status and priority.

## Features

- User authentication and authorization
- CRUD operations for tasks
- Task filtering by status and priority
- Data validation
- Error handling with appropriate HTTP status codes

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /tasks   | Create a new task |
| GET    | /tasks   | Get all tasks (with optional filters) |
| PUT    | /tasks/:id | Update a specific task |
| DELETE | /tasks/:id | Delete a specific task |

## Data Models

### Task Model

| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key (auto-generated) |
| agent_id | Integer | Foreign key referencing the agent |
| title | String | Task title (max 100 chars) |
| detail | String | Task description (max 500 chars) |
| status_id | Integer | Task status (1-5) |
| priority_id | Integer | Task priority (1-3) |
| date | Date | Task date |
| time | String | Task time (format: HH:MM) |
| created_at | Timestamp | When the task was created |
| updated_at | Timestamp | When the task was last updated |

## Project Structure

```
├── configs/
│   └── dbConfig.js           # Database configuration
├── common/
│   └── errors.js             # Custom error classes
├── middlewares/
│   └── authorizeUser.js      # Authentication middleware
├── api/
│   ├── controllers/
│   │   └── task.controller.js # Request handlers
│   ├── services/
│   │   └── task.service.js    # Business logic
│   ├── repositories/
│   │   └── task.repository.js # Database operations
│   ├── validators/
│   │   └── task.validator.js  # Data validation
│   └── routes/
│       └── task.routes.js     # API routes
```

## Authentication

This API uses token-based authentication. All endpoints require a valid authentication token which should be included in the request headers. The `authorizeUser` middleware extracts the agent's ID from the token and makes it available in `req.user.agentId`.

## Running the Project

### Prerequisites

- Node.js
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (database connection, etc.)
4. Start the server:
   ```
   npm start
   ```

## Error Handling

The API handles different types of errors:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication errors)
- `403` - Forbidden (authorization errors)
- `404` - Not Found (resource not found)
- `500` - Internal Server Error (unexpected errors)

## Example Requests

### Create a Task

```
POST /tasks
Content-Type: application/json
Authorization: Bearer <your-token>

{
  "title": "Complete project documentation",
  "detail": "Write comprehensive documentation for the API project",
  "status_id": 1,
  "priority_id": 2,
  "date": "2025-05-01",
  "time": "14:30"
}
```

### Get Tasks with Filters

```
GET /tasks?status=1&priority=2
Authorization: Bearer <your-token>
```

### Update a Task

```
PUT /tasks/123
Content-Type: application/json
Authorization: Bearer <your-token>

{
  "status_id": 2,
  "detail": "Updated task description"
}
```

### Delete a Task

```
DELETE /tasks/123
Authorization: Bearer <your-token>
```