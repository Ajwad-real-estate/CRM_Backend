🧩 Client Management API
This service is part of a microservice-based CRM system. It handles operations related to managing clients, including creating, updating, deleting, assigning agents, and retrieving client data.

📦 Features
Register single or multiple clients

Assign clients to agents

Retrieve clients by ID or with filters

Update or delete clients

Secure endpoints using user and manager authorization

📁 Endpoints
🔐 Authorization Middleware
authorizeUser: Required for all endpoints

authorizeManager: Required for sensitive operations (e.g., delete, assign)

POST /bulk
Create multiple clients

Body:

json
Copy
Edit
{
  "clients": [
    { "name": "John", "email": "john@example.com", ... },
    ...
  ]
}
Response: 207 (Multi-status for partial success/failure)

POST /createClient
Create a single client

Body: JSON payload with client info

Response: 201 Created

PUT /assign
Assign multiple clients to multiple agents

Body:

json
Copy
Edit
{
  "agents": [1, 2],
  "clients": [101, 102]
}
Response: 200 OK with assignments list

GET /getClient
Fetch all clients with optional filters

Query Params:

status: Client status

assigned: true or false

Response: 200 OK with client list

GET /:clientId
Get single client by ID

Response: 200 OK or 404 Not Found

PUT /:clientId
Update a client by ID

Body: Partial or full client fields

Response: 200 OK or 404/400 Error

DELETE /:clientId
Delete client by ID

Middleware: authorizeManager

Response: 200 OK or 404 Not Found