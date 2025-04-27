# 👥 Client Service - CRM Backend

This service handles client management functionality for the CRM system. It exposes RESTful endpoints for creating, retrieving, updating, and deleting clients, as well as assigning agents to clients, secured with role-based access control.

## 📦 Tech Stack
* Node.js
* Express.js
* Middleware for role-based access

## 👤 Client Routes (`api/clients`)

Endpoint | Method | Description | Middleware | Body Params
---------|--------|-------------|------------|------------
`/clients/assign` | PUT | Assign agents to clients | `authorizeUser` | `{ agents: [], clients: [] }`
`/clients/bulk` | POST | Create multiple clients | `authorizeUser` | `{ clients: [] }`
`/clients/createClient` | POST | Create a single client | `authorizeUser` | Client object
`/clients/:clientId` | DELETE | Delete client by ID | `authorizeUser`, `authorizeManager` | None
`/clients/:clientId` | GET | Get client by ID | `authorizeUser` | None
`/clients/getClient` | GET | Get clients with filters | `authorizeUser` | Query params: `status`, `assigned`
`/clients/:clientId` | PUT | Update client by ID | `authorizeUser` | Updated client fields

## 🧩 Implementation Details

```javascript
import { Router } from "express";
import * as controller from "../controller/client.contoller.js";
import { authorizeUser } from "../../user-service/middleware/authorizeUser.js";
import { authorizeManager } from "../../user-service/middleware/authorizeManager.js";

const clientRoute = Router();

clientRoute.use(authorizeUser);

clientRoute.put("/assign", controller.assignClientAgent);
clientRoute.post("/bulk", controller.createMultipleClients);
clientRoute.post("/createClient", controller.createClient);
clientRoute.delete("/:clientId", authorizeManager, controller.deleteClientById);
clientRoute.get("/:clientId", controller.getClientById);
clientRoute.get("/getClient", controller.getClients);
clientRoute.put("/:clientId", controller.updateClientById);

export default clientRoute;
```

## 🔄 Controller Functions

The client routes delegate to these controller methods:

- `assignClientAgent` - Assigns agents to clients
- `createMultipleClients` - Creates multiple clients in bulk
- `createClient` - Creates a single client
- `deleteClientById` - Deletes a client by ID (manager only)
- `getClientById` - Retrieves a client by ID
- `getClients` - Gets all clients with optional filters
- `updateClientById` - Updates a client by ID

## ✅ Middleware

* `authorizeUser` – Applied to all routes, ensures the request has a valid JWT token.
* `authorizeManager` – Applied to delete operations, ensures the requester has manager-level permissions.

## 🛠 Error Handling

All endpoints return error responses in the format:

```json
{
  "message": "Descriptive error message here"
}
```

## 🔑 Special Responses

- Create operations return 201 status with the created resource
- Bulk operations return 207 status with success and failure details
- Delete operations return 200 status with success message
- Not found conditions return 404 status