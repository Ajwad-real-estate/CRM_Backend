# Actions Management API

This repository contains the backend code for managing actions within a real estate CRM system. The API allows agents to create, update, and track various types of actions related to clients and properties.

## Project Structure

The project follows a structured architecture pattern:

```
├── configs/
│   └── dbConfig.js         # Database configuration
├── controllers/
│   └── actionController.js # HTTP request handlers
├── routes/
│   └── actionRoutes.js     # API route definitions
├── services/
│   └── actionService.js    # Business logic
├── utils/
│   ├── dashboardUtils.js   # Utility functions
│   └── dbQueries.js        # Database query functions
└── server.js               # Main application entry point
```

## Key Features

- **Role-based access control**: Agents can only access clients assigned to them, with special permissions for admin roles
- **Action tracking**: Create and manage various types of client actions
- **History management**: View complete history of client actions
- **Status updates**: Update action statuses with related information

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/actions` | Get all actions for the authenticated agent |
| POST | `/api/actions` | Create new action |
| GET | `/api/actions/:id` | Get specific action by ID |
| PUT | `/api/actions/:id` | Update an action |
| GET | `/api/actions/client/:id/history` | Get action history for a specific client |
| GET | `/api/actions/client/:id/incomplete` | Get incomplete actions for a specific client |

## Authentication

All endpoints require authentication. The API uses a middleware that extracts the agent's information from the authentication token.

## Database Schema

The API interacts with the following main tables:
- `action`: Stores action details
- `client`: Stores client information
- `agent`: Stores agent information
- `client_agent_unit`: Maps relationships between clients, agents, and units/projects

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure database connection in `configs/dbConfig.js`
4. Start the server:
   ```
   npm start
   ```

## Environment Variables

Create a `.env` file with the following variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yourdbname
DB_USER=yourdbuser
DB_PASSWORD=yourpassword
PORT=3000
JWT_SECRET=yoursecretkey
```

## Development

To run in development mode with hot reloading:
```
npm run dev
```