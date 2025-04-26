# 🔍 Client Phone Number Search API

This module enables you to search for clients by a partial phone number, especially useful for filtering Egyptian numbers like `010`, `011`, etc.

---

## 📂 Endpoints

### GET `/search/phone/:phone`

🔎 **Description:**  
Fetch clients whose phone number includes the string provided in the URL.

#### ✅ Example:
`GET /search/phone/010`

---

### 🧾 Response:
```json
{
  "clients": [
    {
      "id": 1,
      "name": "Ahmed",
      "email": "ahmed@example.com",
      "phone_numbers": ["01012345678"]
    },
    ...
  ]
}
