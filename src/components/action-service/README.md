# 🎯 Action Service - CRM Backend

This service handles actions performed by sales agents in the CRM system, such as logging client interactions, completing tasks, and tracking action history.  
It secures all endpoints using user authentication and authorization.

---

## 📦 Tech Stack

- Node.js
- Express.js
- JWT Authentication Middleware
- Modular Controller & Service Structure

---

## 📄 Action Routes (`api/action`)

| Endpoint                                  | Method | Description                                  | Body Params |
|-------------------------------------------|--------|----------------------------------------------|-------------|
| `/action/`                                | GET    | Retrieve all actions for the authenticated agent | None        |
| `/action/`                                | POST   | Add a new action                            | Action details in JSON |
| `/action/:id`                             | GET    | Retrieve a specific action by ID            | None        |
| `/action/:id`                             | PUT    | Update an existing action by ID             | Update fields in JSON |
| `/action/actionsHistoryOfClient/:id`      | GET    | Retrieve all completed actions history of a specific client | None |
| `/action/actionsNotcompletedOfClient/:id` | GET    | Retrieve all incomplete actions of a specific client | None |

---

## 📚 Controller Functions

All endpoints are handled through `action.controller.js`:

- `getAllActions()` → Returns all actions assigned to the authenticated agent.
- `addNewAction()` → Adds a new action with proper agent-client authorization.
- `getAction(id)` → Fetches a single action by its ID.
- `updateAction(id)` → Updates action details if the action is not yet completed.
- `getActionsHistoryOfClient(id)` → Fetches all completed actions of a specific client.
- `getActionsNotcompletedOfClient(id)` → Fetches all ongoing (not completed) actions for a specific client.

---

## 🔒 Authentication & Authorization

All routes are protected using `authorizeUser` middleware:

- Requires a valid JWT token.
- Access is scoped to the authenticated agent (e.g., actions linked to their own clients).

---

## 🛠 Error Handling

All endpoints return errors consistently in the format:

```json
{
  "message": "Descriptive error message here"
}
