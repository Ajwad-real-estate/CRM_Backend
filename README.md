# Real Estate CRM System

A comprehensive customer relationship management system for real estate agents and managers, providing tools for client management, task tracking, action planning, and performance analytics.

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Key Features](#key-features)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Development](#development)

## Overview

This Real Estate CRM is designed to streamline agent workflow, manage client relationships, and provide actionable insights through analytics. The system supports multiple user roles with appropriate access controls and offers a complete set of features required for real estate sales operations.

## System Architecture

The project follows a modular architecture with service-based organization:

- **Backend Server**: Express.js application with RESTful API endpoints
- **Database**: PostgreSQL relational database
- **Authentication**: JWT-based authentication system
- **Service Layer**: Separate business logic for different domains
- **Middleware**: Role-based access control and request validation

## Key Features

- **User Management**: Role-based user system (Admin, Manager, Agent)
- **Client Management**: Complete client lifecycle management with status tracking
- **Agent Assignment**: Assign clients to agents with round-robin distribution
- **Task Management**: Create, assign, and track tasks with prioritization
- **Action Tracking**: Record and manage client interactions and follow-ups
- **Dashboard Analytics**: Role-specific performance metrics and KPIs
- **History Tracking**: Comprehensive audit trail for client activities

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Authenticate user and receive JWT token |
| POST | `/auth/register` | Register a new user (admin access) |
| POST | `/auth/refresh` | Refresh authentication token |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/profile` | Get current user profile |
| PUT | `/user/profile` | Update current user profile |
| GET | `/user/:id` | Get specific user by ID (manager access) |
| PUT | `/user/:id` | Update user by ID (manager access) |

### Agent Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/agent/register-sales` | Register a new sales agent |
| GET | `/agent/sales-agents` | Get list of all sales agents |

### Role Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/role/available-roles` | Get available roles based on user privilege |

### Client Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/clients` | Create a new client |
| GET | `/clients` | Get all clients with filtering options |
| GET | `/clients/:id` | Get specific client by ID |
| PUT | `/clients/:id` | Update client information |
| DELETE | `/clients/:id` | Remove a client |
| POST | `/clients/assign` | Assign clients to agents |

### Task Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks with filtering |
| PUT | `/tasks/:id` | Update a specific task |
| DELETE | `/tasks/:id` | Delete a specific task |

### Action Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/actions` | Get all actions for the authenticated agent |
| POST | `/api/actions` | Create new action |
| GET | `/api/actions/:id` | Get specific action by ID |
| PUT | `/api/actions/:id` | Update an action |
| GET | `/api/actions/client/:id/history` | Get action history for a client |
| GET | `/api/actions/client/:id/incomplete` | Get incomplete actions for a client |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard` | Get role-specific dashboard metrics |

## Authentication & Authorization

The system implements a comprehensive security model:

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Different permission levels for Admin, Manager, and Agent roles
- **Resource Protection**: Users can only access resources they are authorized for
- **Middleware Guards**: `authorizeUser` and `authorizeManager` middleware protect routes

## Project Structure

```
src/
├── configs/
│   └── dbConfig.js                # Database configuration
├── controllers/
│   ├── actionController.js        # Action-related controllers
│   ├── agentController.js         # Agent management controllers
│   ├── authController.js          # Authentication controllers
│   ├── clientController.js        # Client management controllers
│   ├── roleController.js          # Role management controllers
│   ├── taskController.js          # Task management controllers
│   └── userController.js          # User management controllers
├── middlewares/
│   ├── authorizeManager.js        # Manager-level authorization middleware
│   └── authorizeUser.js           # User-level authorization middleware
├── models/
│   ├── authModel.js               # Authentication data models
│   └── userModel.js               # User data models
├── routes/
│   ├── actionRoutes.js            # Action API routes
│   ├── agentRoutes.js             # Agent management routes
│   ├── authRoutes.js              # Authentication routes
│   ├── clientRoutes.js            # Client management routes
│   ├── dashboardRoutes.js         # Dashboard routes
│   ├── roleRoutes.js              # Role management routes
│   ├── taskRoutes.js              # Task management routes
│   └── userRoutes.js              # User management routes
├── services/
│   ├── action/                    # Action management services
│   ├── client/                    # Client management services
│   │   ├── createClient.services.js
│   │   ├── getClients.services.js
│   │   ├── getClientById.services.js
│   │   ├── updateClientById.services.js
│   │   ├── deleteClientById.services.js
│   │   └── assignClientAgent.services.js
│   ├── dashboard/                 # Dashboard services
│   │   ├── controllers/
│   │   │   ├── dashboard.controller.js
│   │   │   ├── agentDashboard.controller.js
│   │   │   └── managerDashboard.controller.js
│   │   ├── queries/
│   │   │   └── dashboard.queries.js
│   │   └── routes/
│   │       └── dashboard.route.js
│   ├── role/                      # Role management services
│   ├── task/                      # Task management services
│   └── user/                      # User management services
├── utils/
│   ├── authUtils.js               # Authentication utilities
│   ├── dashboardUtils.js          # Dashboard helper functions
│   ├── dbQueries.js               # Database query functions
│   ├── helpers.js                 # General helper functions
│   └── queries.js                 # SQL query templates
└── server.js                      # Main application entry point
```

## Database Schema

The system uses the following core tables:

- **users**: User accounts with authentication details
- **roles**: User role definitions and privileges
- **agents**: Sales agent information and targets
- **clients**: Client information and status
- **client_agent_unit**: Relationship between clients, agents, and properties
- **actions**: Client interactions and follow-ups
- **tasks**: Agent tasks and assignments
- **phone_numbers**: Client contact information

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure database connection in `.env` file
4. Run database migrations (if applicable)
5. Start the server:
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
JWT_EXPIRY=1d
```

## Development

To run in development mode with hot reloading:
```
npm run dev
```

## Error Handling

The API implements comprehensive error handling:

- **Input Validation**: Validates required fields before processing
- **Database Errors**: Catches and processes database-related errors
- **Not Found Handling**: Returns appropriate status when resources aren't found
- **Transaction Safety**: Uses database transactions to ensure data integrity
- **Standardized Error Responses**: Consistent error format across all endpoints