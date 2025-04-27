# 🧑‍💼 Sales Agent, Roles & User Management Services - CRM Backend

These services manage sales agent registration, available role retrieval, and user profile management functionalities within the CRM system.  
All user-related operations are secured using role-based authentication.

---

## 📦 Tech Stack

- Node.js
- Express.js
- JWT Authentication Middleware
- Modular Controller Structure

---

## 📄 Sales Agent Routes (`api/agent`)

| Endpoint             | Method | Description                          | Body Params               |
|----------------------|--------|--------------------------------------|----------------------------|
| `/agent/register-sales` | POST   | Create a new sales agent account    | Sales agent registration data |
| `/agent/sales-agents` | GET    | Retrieve a list of all sales agents | None |

### 📚 Controller Functions

- `createSalesAccount()` → Registers a new sales agent account.
- `getSalesAgents()` → Fetches a list of existing sales agents.

---

## 📄 Roles Routes (`api/role`)

| Endpoint                 | Method | Description                           | Body Params |
|---------------------------|--------|---------------------------------------|-------------|
| `/role/available-roles`   | GET    | Retrieve a list of available roles   | None        |

### 📚 Controller Functions

- `rolesTitles()` → Returns all available role titles in the system.

---

## 📄 User Management Routes (`api/user`)

| Endpoint            | Method | Description                          | Middleware          | Body Params       |
|---------------------|--------|--------------------------------------|---------------------|-------------------|
| `/user/profile`     | GET    | Retrieve profile of logged-in manager | `authorizeManager` | None              |
| `/user/profile`     | PUT    | Update profile of logged-in manager | `authorizeManager` | Profile update fields |
| `/user/:id`         | GET    | Retrieve any user profile by ID (Admin usage) | `authorizeManager` | None              |
| `/user/:id`         | PUT    | Update any user profile by ID (Admin usage) | `authorizeManager` | Profile update fields |

### 📚 Controller Functions

- `getUserData()` → Fetches profile data of the logged-in manager.
- `updateUserData()` → Updates profile data of the logged-in manager.
- `getUserDataById(id)` → Fetches user data by specific ID (admin usage).
- `updateUserDataById(id)` → Updates user data by specific ID (admin usage).

---

## 🔒 Authentication & Authorization

- `authorizeUser` – Ensures the requester is a valid, authenticated user (used in other parts).
- `authorizeManager` – Ensures the requester has manager-level permissions (used here for user management).

---

## 🛠 Error Handling

All endpoints return errors consistently in the format:

```json
{
  "message": "Descriptive error message here"
}
