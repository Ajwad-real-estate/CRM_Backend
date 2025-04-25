# API Documentation

## Overview

This documentation provides details about the backend API built with Express.js. The API consists of three main resource endpoints:
- Agent Management
- Role Management
- User Management

Each section includes endpoint details, request parameters, authentication requirements, and expected responses.

## Authentication

Many endpoints are protected by authentication middleware:
- `authorizeUser`: Verifies that the request comes from an authenticated user
- `authorizeManager`: Verifies that the authenticated user has manager-level permissions

## API Endpoints

### Agent Management

#### Register Sales Agent
- **Endpoint**: `POST /agent/register-sales`
- **Controller**: `createSalesAccount`
- **Description**: Creates a new sales agent account in the system
- **Authentication**: Required
- **Request Body**: Sales agent details (not specified in provided code)
- **Response**:
  - `200`: Successfully created sales agent
  - `500`: Internal server error

#### Get Sales Agents
- **Endpoint**: `GET /agent/sales-agents`
- **Controller**: `getSalesAgents`
- **Description**: Retrieves a list of all sales agents
- **Authentication**: Required (implied)
- **Response**:
  - `200`: List of sales agents
  - `500`: Internal server error

### Role Management

#### Get Available Roles
- **Endpoint**: `GET /role/available-roles`
- **Controller**: `rolesTitles`
- **Description**: Returns roles with lower privileges than the requesting user
- **Authentication**: Required (uses `req.user.roleId`)
- **Response**:
  - `200`: List of available roles
  - `500`: Internal server error

### User Management

#### Get Current User Profile
- **Endpoint**: `GET /user/profile`
- **Controller**: `getUserData`
- **Description**: Retrieves the profile data for the currently logged-in user
- **Authentication**: Required (authorizeManager)
- **Response**:
  - `200`: User profile data
  - `500`: Internal server error

#### Update Current User Profile
- **Endpoint**: `PUT /user/profile`
- **Controller**: `updateUserData`
- **Description**: Updates the profile data for the currently logged-in user
- **Authentication**: Required (authorizeManager)
- **Request Body**: User data fields to update
- **Response**:
  - `200`: Updated user profile
  - `500`: Internal server error

#### Get User by ID
- **Endpoint**: `GET /user/:id`
- **Controller**: `getUserDataById`
- **Description**: Retrieves user data for a specific user by ID (admin function)
- **Authentication**: Required (authorizeManager)
- **URL Parameters**: 
  - `id`: ID of the user to retrieve
- **Response**:
  - `200`: User data
  - `500`: Internal server error

#### Update User by ID
- **Endpoint**: `PUT /user/:id`
- **Controller**: `updateUserDataById`
- **Description**: Updates user data for a specific user by ID (admin function)
- **Authentication**: Required (authorizeManager)
- **URL Parameters**: 
  - `id`: ID of the user to update
- **Request Body**: User data fields to update
- **Response**:
  - `200`: Updated user data
  - `500`: Internal server error

## Service Layer

The API implements a service layer pattern, separating controller logic from business logic:

### Services
- `roles.service.js`: Contains the `getRolesLowerThanUser` function to determine available roles based on user's role level
- `salesAgent.service.js`: Contains `registerSalesAgent` and `fetchSalesAgents` functions
- `user.service.js`: Contains `getUserByIdService` and `updateUserByIdService` functions

## Error Handling

All controllers implement consistent error handling with try/catch blocks that:
1. Log the error to the console
2. Return a standardized 500 error response with a generic error message

## Response Format

API responses follow a consistent format:
- Responses from service functions include both a status code and a response body
- Controllers extract these values and send appropriate HTTP responses

## Security Considerations

- Authentication middleware is applied to protect sensitive routes
- Role-based access control is implemented via the `authorizeManager` middleware
- The API appears to use separate authorization checks for different privilege levels