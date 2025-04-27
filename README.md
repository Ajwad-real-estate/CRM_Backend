# 🚀 CRM Backend System

A comprehensive Customer Relationship Management backend system for sales teams, featuring multiple interconnected services for client management, task tracking, user authentication, and analytics.

## 🌟 Overview

This CRM system empowers sales teams to manage clients, track interactions, assign tasks, and monitor performance through a robust set of RESTful APIs. The system follows a modular microservices architecture, with each service handling specific functionality while maintaining secure authentication and authorization across all endpoints.

## 📋 Services

### 👥 User Service
Handles authentication and user management functionality.

- Login, logout, token refresh
- User registration and profile management
- Role-based access control
- Secure password handling

### 👤 Client Service
Manages all client-related operations.

- Create, retrieve, update, and delete clients
- Assign agents to clients
- Bulk client creation
- Filtered client searching

### 🎯 Task Management Service
Provides comprehensive task tracking for agents.

- CRUD operations for tasks
- Task filtering by status and priority
- Date and time scheduling
- Agent task assignment

### 📊 Dashboard Service
Delivers role-specific performance metrics.

- Agent-specific KPIs
- Manager-level overview statistics
- Client status analytics
- Activity tracking

### 🎯 Action Service
Tracks all agent-client interactions.

- Log client interactions
- Track completed vs. incomplete actions
- View client action history
- Update action status

### 🧑‍💼 Agent Service
Manages sales agent profiles and roles.

- Register new sales agents
- Retrieve available roles
- User profile management
- Agent listing

### 🔍 Search Service
Enables efficient data retrieval.

- Client search by phone number
- Additional search capabilities

### 📊 Lookups Service
Provides reference data for the application.

- Cities listing
- Agent status types
- Task status types

## 🔧 Tech Stack

- **Backend**: Node.js with Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Architecture**: RESTful API, Microservices
- **Database**: PostgreSQL (implied from configuration references)

## 🏗️ Project Structure

```
├── components/
│   ├── user-service/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── validators/
│   ├── client-service/
│   ├── task-service/
│   ├── dashboard-service/
│   ├── agent-service/
│   ├── action-service/
│   ├── search-service/
│   └── things-service/
├── configs/
│   └── dbConfig.js
├── common/
│   └── errors.js
├── middlewares/
│   ├── authorizeUser.js
│   └── authorizeManager.js
└── app.js
```

## 🔒 Authentication & Authorization

The system uses token-based authentication with JWT:
- `authorizeUser` middleware ensures valid authentication
- `authorizeManager` middleware provides role-based access control
- Login generates access and refresh tokens
- Token refresh mechanism for maintained sessions

## 🚦 API Routes

### Authentication Routes (`/api/auth`)
| Endpoint         | Method | Description                |
|------------------|--------|----------------------------|
| `/auth/login`    | POST   | User login                 |
| `/auth/logout`   | POST   | User logout                |
| `/auth/token`    | POST   | Refresh access token       |

### User Routes (`/api/auth`)
| Endpoint           | Method | Description               |
|--------------------|--------|---------------------------|
| `/auth/register`   | POST   | Register new user         |
| `/auth/regemail`   | POST   | Update own email          |
| `/auth/repassword` | POST   | Update own password       |

### Client Routes (`/api/clients`)
| Endpoint                  | Method | Description                   |
|---------------------------|--------|-------------------------------|
| `/clients/assign`         | PUT    | Assign agents to clients      |
| `/clients/bulk`           | POST   | Create multiple clients       |
| `/clients/createClient`   | POST   | Create single client          |
| `/clients/:clientId`      | GET    | Get client by ID              |
| `/clients/:clientId`      | PUT    | Update client                 |
| `/clients/:clientId`      | DELETE | Delete client                 |
| `/clients/getClient`      | GET    | Get filtered clients          |

### Task Routes (`/api/tasks`)
| Endpoint       | Method | Description              |
|----------------|--------|--------------------------|
| `/tasks`       | POST   | Create new task          |
| `/tasks`       | GET    | Get all tasks (filtered) |
| `/tasks/:id`   | PUT    | Update task              |
| `/tasks/:id`   | DELETE | Delete task              |

### Dashboard Route (`/api/dashboard`)
| Endpoint      | Method | Description                    |
|---------------|--------|--------------------------------|
| `/dashboard`  | GET    | Get role-based dashboard data  |

### Agent Routes (`/api/salesAgent`)
| Endpoint                     | Method | Description                |
|------------------------------|--------|----------------------------|
| `/salesAgent/register-sales` | POST   | Register sales agent       |
| `/salesAgent/sales-agents`   | GET    | List all sales agents      |

### Role Routes (`/api/role`)
| Endpoint                 | Method | Description                |
|--------------------------|--------|----------------------------|
| `/role/available-roles`  | GET    | Get all available roles    |

### User Management Routes (`/api/salesAgent/user`)
| Endpoint                  | Method | Description                   |
|---------------------------|--------|-------------------------------|
| `/salesAgent/user/profile`| GET    | Get user profile              |
| `/salesAgent/user/profile`| PUT    | Update user profile           |
| `/salesAgent/user/:id`    | GET    | Get user by ID (admin)        |
| `/salesAgent/user/:id`    | PUT    | Update user by ID (admin)     |

### Action Routes (`/api/actions`)
| Endpoint                                    | Method | Description                      |
|---------------------------------------------|--------|----------------------------------|
| `/actions/`                                 | GET    | Get all actions                  |
| `/actions/`                                 | POST   | Create new action                |
| `/actions/:id`                              | GET    | Get action by ID                 |
| `/actions/:id`                              | PUT    | Update action                    |
| `/actions/actionsHistoryOfClient/:id`       | GET    | Get client's completed actions   |
| `/actions/actionsNotcompletedOfClient/:id`  | GET    | Get client's pending actions     |

### Search Routes (`/api/search`)
| Endpoint              | Method | Description                   |
|-----------------------|--------|-------------------------------|
| `/search/phone/:phone`| GET    | Search clients by phone       |

### Lookup Routes (`/api/things`)
| Endpoint                | Method | Description                  |
|-------------------------|--------|------------------------------|
| `/things/city`          | GET    | Get available cities         |
| `/things/agent-statuses`| GET    | Get agent status types       |
| `/things/task-statuses` | GET    | Get task status types        |

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14+)
- PostgreSQL database

### Steps

1. Clone the repository
   ```
   git clone https://github.com/your-username/crm-backend.git
   cd crm-backend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   ```
   # Create .env file with these variables
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=crm_database
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret_key
   PORT=3000
   ```

4. Initialize the database
   ```
   # Run database migration script (if available)
   npm run migrate
   ```

5. Start the server
   ```
   npm start
   ```

## 🛠️ Error Handling

All API endpoints return consistent error responses with appropriate HTTP status codes:

```json
{
  "message": "Descriptive error message"
}
```

Common status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication failures)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Password encryption
- Secure token management
- Request validation
