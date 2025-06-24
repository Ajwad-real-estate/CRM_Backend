# Dashboard Service

This module provides dashboard functionality for a sales/CRM application, displaying different metrics based on user roles.

## Overview

The dashboard service fetches and presents key performance indicators (KPIs) for agents and managers. It includes:

- Query collections for different user roles
- Role-based controllers
- Secure API endpoints with authorization

## Structure

```
services/dashboard/
├── queries/
│   └── dashboard.queries.js     # SQL queries for dashboard data
├── controllers/
│   ├── dashboard.controller.js  # Main controller that delegates based on role
│   ├── agentDashboard.controller.js  # Agent-specific dashboard logic
│   └── managerDashboard.controller.js  # Manager-specific dashboard logic
└── routes/
    └── dashboard.route.js       # API route definitions
```

## API Endpoints

### 1. GET /dashboard
- **Description:** Returns dashboard data based on the authenticated user's role (Agent or Manager).
- **Authentication:** Requires Authorization header with a valid JWT (Bearer Token).
- **Input:**
  - Header: `Authorization: Bearer <token>`
- **Output:**
  - If the user is an Agent:
    ```json
    {
      "target": 100,
      "followUpCount": 24,
      "meetingCount": 12,
      "followMeetCount": 8,
      "emailCount": 35,
      "newClientsCount": 15,
      "qualifiedClientsCount": 10,
      "reservedClientsCount": 5,
      "doneClientsCount": 3
    }
    ```
  - If the user is a Manager:
    ```json
    {
      "target": 100,
      "followUpCount": 24,
      "meetingCount": 12,
      "followMeetCount": 8,
      "emailCount": 35,
      "newClientsCount": 15,
      "newAssignedClientsCount": 8,
      "qualifiedClientsCount": 10,
      "reservedClientsCount": 5,
      "doneClientsCount": 3
    }
    ```

### 2. GET /dashboard/salesDashboard/:id
- **Description:** Returns dashboard data for a specific sales agent by ID.
- **Authentication:** Requires Authorization header with a valid JWT (Bearer Token) for managers.
- **Input:**
  - Header: `Authorization: Bearer <token>` (Manager role required)
  - URL Parameter: `id` (Sales agent ID)
- **Output:**
  ```json
  {
    "target": 100,
    "followUpCount": 24,
    "meetingCount": 12,
    "followMeetCount": 8,
    "emailCount": 35,
    "newClientsCount": 15,
    "qualifiedClientsCount": 10,
    "reservedClientsCount": 5,
    "doneClientsCount": 3
  }
  ```

## Authentication & Authorization
- All endpoints require a valid JWT token in the header:
  - Example: `Authorization: Bearer <your_token>`
- `/dashboard/salesDashboard/:id` is restricted to users with the Manager role.
- Token is verified using the `authorizeUser` middleware. Requests without a valid token will be rejected.

## Error Handling
- **401 Unauthorized:** If the token is missing or invalid.
- **403 Forbidden:** If the token is not authorized or the user does not have the required role.
- **500 Internal Server Error:** Server error.
- **404 Not Found:** If no data is found for the sales agent in `/salesDashboard/:id`.

## Database Schema

The dashboard relies on the following tables:
- `agent`: Stores user targets and details
- `action`: Tracks different types of activities (follow-ups, meetings, etc.)
- `client`: Manages client records with various status types

### Action Types
- Type 1: Follow-up
- Type 2: Meeting
- Type 3: Follow-up Meeting
- Type 4: Email

### Client Statuses
- Status 1: New
- Status 2: Qualified
- Status 3: Reserved
- Status 4: Done

## Usage

The dashboard service is integrated into the main application router:

```javascript
import dashboardRoute from "./services/dashboard/routes/dashboard.route.js";
router.use("/dashboard", dashboardRoute);
```

## Security Notes

- The service uses middleware (`authorizeUser`) to ensure all requests are authenticated
- User roles determine which dashboard view is displayed (agent or manager)
- Database queries are parameterized to prevent SQL injection