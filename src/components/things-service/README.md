# 📊 Lookups Service - CRM Backend

This service provides lookup data for the CRM system. It exposes RESTful endpoints for retrieving cities, agent statuses, and task statuses used throughout the application.

## 📦 Tech Stack
* Node.js
* Express.js
* Router middleware for endpoint organization

## 🔍 Lookup Routes (`/things`)

Endpoint | Method | Description
---------|--------|------------
`/things/city` | GET | Retrieve list of available cities
`/things/agent-statuses` | GET | Retrieve list of agent statuses
`/things/task-statuses` | GET | Retrieve list of task statuses

## 🧩 Implementation Details

```javascript
import { Router } from "express"; 
import * as controller from "../controller/things.controller.js";

const things = Router();
things.get('/city', controller.getCities); 
things.get('/agent-statuses', controller.getAgentStatuses); 
things.get('/task-statuses', controller.getTaskStatuses);

export default things;
```

## 🛠 Usage

Mount this router in your main Express application:

```javascript
import express from "express";
import thingsRouter from "./routes/things.js";

const app = express();
app.use("/things", thingsRouter);
```