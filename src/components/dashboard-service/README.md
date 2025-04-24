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

### GET /dashboard
Returns dashboard data based on the authenticated user's role.

**Authentication:** Required
**Authorization:** All roles with valid JWT

**Response:**
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

Manager response includes additional field:
```json
{
  "newAssignedClientsCount": 8
  // ...other fields
}
```

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

## Error Handling

The service includes error handling and will return appropriate HTTP status codes:
- 200: Successful response with dashboard data
- 500: Server error with a generic error message