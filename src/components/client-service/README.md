# Client Service Documentation

## Overview

The Client Service module provides a comprehensive set of operations for managing client data within the application. It implements business logic for creating, retrieving, updating, and deleting client records, as well as handling specialized operations like client-agent assignments.

## Table of Contents

- [Dependencies](#dependencies)
- [Service Modules](#service-modules)
- [API Reference](#api-reference)
  - [Create Client](#1-create-client)
  - [Get Clients](#2-get-clients)
  - [Get Client by ID](#3-get-client-by-id)
  - [Update Client](#4-update-client)
  - [Delete Client](#5-delete-client)
  - [Assign Clients to Agents](#6-assign-clients-to-agents)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Transactions](#transactions)

## Dependencies

- Database connection pool from `../../../db/db`
- Query utility functions from `utils/queries/clientQueries.js`
- Helper functions from `utils/helpers/clientHelpers.js`

## Service Modules

The Client Service is composed of several specialized service modules:

| Module | File Path | Description |
|--------|-----------|-------------|
| Create Client | `services/createClient.services.js` | Handles client creation operations |
| Get Clients | `services/getClients.services.js` | Retrieves multiple clients based on filters |
| Get Client by ID | `services/getClientById.services.js` | Retrieves a specific client by ID |
| Update Client | `services/updateClientById.services.js` | Updates client information |
| Delete Client | `services/deleteClientById.services.js` | Removes a client from the system |
| Assign Client Agent | `services/assignClientAgent.services.js` | Manages agent-client assignments |

## API Reference

### 1. Create Client

Creates a new client record with associated phone numbers.

```javascript
import { createClientService } from "../../services/createClient.services.js";

// Example usage
const clientData = {
  name: "John Doe",
  age: 35,
  email: "john.doe@example.com",
  city_id: "city-uuid",
  street: "123 Main St",
  channel_id: "channel-uuid",
  type_id: "type-uuid",
  status_id: "status-uuid",
  budget: 150000,
  phoneNumbers: ["1234567890", "0987654321"]
};

const result = await createClientService(clientData);
// Returns: { clientId: "client-uuid", message: "Client created successfully." }
```

**Validation**:
- Phone numbers are required
- Checks for duplicate phone numbers in the system

### 2. Get Clients

Retrieves clients based on user role, permissions, and optional filters.

```javascript
import { getClientsService } from "../../services/getClients.services.js";

// Example usage
const user = {
  roleId: 1, // 1=Admin, 2=Manager, 3=Agent
  agentId: "agent-uuid" // Required for agent role
};

const filters = {
  status: "qualified", // Status filter (can be name or ID)
  assigned: "true" // Filter by assignment status
};

const clients = await getClientsService(user, filters);
// Returns array of client objects with phone numbers
```

**Access Controls**:
- Administrators and managers can view all clients
- Agents can only view clients assigned to them
- Status filters are converted to appropriate IDs

### 3. Get Client by ID

Retrieves detailed information about a specific client.

```javascript
import { getClientByIdService } from "../../services/getClientById.services.js";

// Example usage
const clientId = "client-uuid";
const client = await getClientByIdService(clientId);
// Returns client object with phone numbers or null if not found
```

### 4. Update Client

Updates client information, including phone numbers.

```javascript
import { updateClientByIdService } from "../../services/updateClientById.services.js";

// Example usage
const clientId = "client-uuid";
const updates = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  phone_numbers: ["5551234567", "5559876543"]
};

const updatedClient = await updateClientByIdService(clientId, updates);
// Returns updated client object or null if not found
```

**Features**:
- Updates only allowed fields
- Handles phone number updates in a separate table
- Returns the complete updated client with phone numbers

### 5. Delete Client

Removes a client from the system.

```javascript
import { deleteClientByIdService } from "../../services/deleteClientById.services.js";

// Example usage
const clientId = "client-uuid";
const result = await deleteClientByIdService(clientId);
// Returns { rowCount } indicating number of rows affected
```

### 6. Assign Clients to Agents

Assigns multiple clients to multiple agents using quantity-based or round-robin distribution.

```javascript
import { assignClientAgentService } from "../../services/assignClientAgent.services.js";

// Example usage
const agents = [
  { id: "agent1-uuid", quantity: 5 },
  { id: "agent2-uuid", quantity: 0 } // 0 quantity means round-robin
];

const clients = ["client1-uuid", "client2-uuid", "client3-uuid", /* ... */];

const result = await assignClientAgentService(agents, clients);
// Returns { assignments: [{ agentId, clientId }, ...] }
```

**Distribution Algorithm**:
1. Agents with specific quantities get their requested number of clients first
2. Remaining clients are distributed evenly among round-robin agents (quantity=0)

## Data Models

### Client Object

```javascript
{
  id: "uuid", // Primary key
  name: "String",
  age: Number,
  email: "String",
  city_id: "uuid", // Foreign key to cities table
  street: "String",
  channel_id: "uuid", // Foreign key to channels table
  type_id: "uuid", // Foreign key to client types table
  status_id: "uuid", // Foreign key to statuses table
  budget: Number,
  agent_id: "uuid", // Foreign key to agents table
  assign_time: "ISO DateTime",
  created_at: "ISO DateTime",
  updated_at: "ISO DateTime",
  phone_numbers: ["String", "String"] // Array of phone numbers
}
```

## Error Handling

The client services implement comprehensive error handling:

- **Input Validation**: Validates required fields and data formats before processing
- **Database Errors**: Catches and processes database-related errors
- **Not Found Handling**: Returns null or appropriate status when records are not found
- **Transaction Safety**: Uses database transactions to ensure data integrity

## Transactions

Several operations use database transactions to ensure atomicity:

- **Client Creation**: Client and phone numbers are created within a single transaction
- **Client Update**: Client updates and phone number changes occur in a single transaction
- **Bulk Operations**: Multiple related changes are executed within transactions

Transactions ensure that if any part of an operation fails, the entire operation is rolled back to maintain data consistency.