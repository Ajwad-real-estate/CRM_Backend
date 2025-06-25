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

```

---

### GET `/search/filters`

🔎 **Description:**  
Filter units by multiple criteria such as city, region, project, price, space, delivery, payment method, type, and category.

#### ✅ Example:
```
GET {{baseUrl}}/api/search/filters?city=Cairo&region=Downtown&project=Project Alpha&min_price=90000&min_space=90&instant_delivery=true&payment_method=installment&type=Apartment&category=Residential
```

#### 🔑 Supported Query Parameters:
- `city` (e.g. Cairo)
- `region` (e.g. Downtown)
- `project` (e.g. Project Alpha)
- `min_price`, `max_price`, `price`
- `min_space`, `max_space`, `space`
- `instant_delivery` (true/false)
- `payment_method` (e.g. installment)
- `type` (e.g. Apartment)
- `category` (e.g. Residential)
- `bedrooms`, `bathrooms`, `garden`, `elevator`, `unit_rent_sale`, `unit_finish`, `unit_view`, `unit_floor`, `status`, etc.

#### 🧾 Example Response:
```json
{
  "success": true,
  "results": [
    {
      "devolper": "Project Alpha",
      "type": "Apartment",
      "governate": "Cairo",
      "region": "Downtown",
      "price": 95000,
      "space": 120,
      "status": "available",
      "created_at": "2024-05-01T10:00:00.000Z",
      "updated_at": "2024-05-10T10:00:00.000Z",
      "bedrooms": 3,
      "bathrooms": 2,
      "garden": true,
      "elevator": true,
      "unit_rent_sale": "sale",
      "unit_finish": "semi-finished",
      "unit_view": "garden",
      "unit_floor": 2,
      "payment_method": "installment",
      "instant_delivery": true,
      "code": "A1234",
      "category_name": "Residential"
    },
    ...
  ]
}
```
