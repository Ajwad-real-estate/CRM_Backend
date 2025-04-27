# 👥 User Service - CRM Backend

This service handles authentication and user management functionality for the CRM system. It exposes RESTful endpoints for login, logout, token refresh, user registration, email updates, and password resets, secured with role-based access control.

---

## 📦 Tech Stack

- Node.js
- Express.js
- JWT for authentication
- Middleware for role-based access

---

## 🔐 Authentication Routes (`api/auth`)

| Endpoint         | Method | Description                | Body Params                     |
|------------------|--------|----------------------------|----------------------------------|
| `/auth/login`    | POST   | Login with credentials     | `{ identifier, password }`      |
| `/auth/logout`   | POST   | Logout a user              | `{ refreshToken }`              |
| `/auth/token`    | POST   | Refresh access token       | `{ refreshToken }`              |

---

## 👤 User Routes (`api/users`)

| Endpoint         | Method | Description                | Body Params                     |
|------------------|--------|----------------------------|----------------------------------|
| `/users/register`| POST   | Register a new user        | Full user object                |

### 🔑 Manager-only Routes

| Endpoint                | Method | Description                              | Middleware         | Body Params                            |
|-------------------------|--------|------------------------------------------|---------------------|-----------------------------------------|
| `/users/regemail/:id`   | POST   | Update user email by ID                 | `authorizeManager` | `{ newEmail }`                          |
| `/users/repassword/:id` | POST   | Update password by ID                   | `authorizeManager` | `{ newPassword }`                       |

### 👨 User Routes

| Endpoint             | Method | Description                    | Middleware       | Body Params                              |
|----------------------|--------|--------------------------------|------------------|-------------------------------------------|
| `/users/regemail`    | POST   | Update your own email         | `authorizeUser` | `{ currentEmail, newEmail }`             |
| `/users/repassword`  | POST   | Update your own password      | `authorizeUser` | `{ email, newPassword }`                 |

---

## ✅ Middleware

- `authorizeUser` – Ensures the request has a valid JWT token.
- `authorizeManager` – Ensures the requester has manager-level permissions.

---

## 🛠 Error Handling

All endpoints return error responses in the format:
```json
{
  "message": "Descriptive error message here"
}
