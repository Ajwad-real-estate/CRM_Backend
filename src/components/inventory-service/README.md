# Inventory API

A RESTful API for managing real estate inventory, focusing on projects and available units.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Overview

This API provides access to real estate project information and available unit inventory. It allows clients to retrieve project IDs with available units and fetch detailed unit information for specific projects.

**Important Note:** The API is specifically designed to return only projects that have available units and only units with "available" status.

## Project Structure

```
inventory-api/
├── controllers/
│   └── inventory.controller.js
├── routes/
│   └── inventory.routes.js
├── services/
│   └── inventory.services.js
├── utils/
│   └── quires/
│       └── inventory.quires.js
└── db/
    └── db.js
```

## API Endpoints

### Get All Projects with Available Units

```
GET /inventory/getAllProjectsIDS
```

Returns a list of all projects that have at least one available unit. The endpoint filters projects to include only those with units having "available" status.

**Response Example:**
```json
{
  "projects": [
    {
      "id": "123",
      "company": "BuildCo",
      "name": "Riverside Heights",
      "name": "San Francisco",
      "street": "123 Main Street",
      "landing_page": "riverside-heights"
    },
    ...
  ]
}
```

### Get All Available Units for a Project

```
GET /inventory/getUnits/:id
```

Returns all available units for a specific project. Only units with "available" status are included in the response.

**Parameters:**
- `id`: Project ID

**Response Example:**
```json
{
  "units": [
    {
      "id": "A101",
      "name": "Luxury Suite",
      "type_id": "apartment",
      "name": "San Francisco",
      "street": "123 Main Street",
      "status": "available",
      "price": "850000"
    },
    ...
  ]
}
```
## Database

The API connects to a PostgreSQL database using a connection pool. The database schema includes the following tables:
- `project`: Contains information about real estate projects
- `unit`: Contains details about individual units within projects
- `city`: Contains city information

**Filtering Logic:** The SQL queries are designed to filter results based on unit availability status, ensuring that only relevant data is returned to clients.

## Error Handling

The API implements centralized error handling with appropriate HTTP status codes:
- `200`: Successful request
- `500`: Internal server error (with error logging)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request