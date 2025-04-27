import express from "express";
import cors from "cors";
import express from 'express';
import userRoutes from './src/components/user-service/routes/userRoutes.js';
import authRoutes from './src/components/user-service/routes/authRoutes.js';
import clientRoute from './src/components/client-service/routes/client.route.js';
import task from './src/components/task-service/routes/task.routes.js';
import dashboardRoute from "./src/components/dashboard-service/routes/dashboard.route.js";
import agent from './src/components/agent-service/routes/agent.routes.js';
import role from './src/components/agent-service/routes/roles.routes.js';
import user from './src/components/agent-service/routes/user.routes.js';
import action from './src/components/action-service/routes/action.route.js';
import search from './src/components/search-service/routes/search.route.js';
import things from './src/components/things-service/routes/things.routes.js';
import inventory from './src/components/inventory-service/routes/inventory.routes.js';


const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://localhost:4174"
];

// Middleware
app.use(cors({
  origin: allowedOrigins, // Replace with your frontend's URL during production
  credentials: true, // Allow cookies and other credentials
}));
app.use(express.json());

// API routes

routes.use('/api/auth', authRoutes);
routes.use('/api/users', userRoutes);

// client service
routes.use('/api/clients', clientRoute);

// task service
routes.use('/api/tasks', task);

// dashboard service
routes.use('/api/dashboard', dashboardRoute);

// agent service
routes.use('/api/salesAgent', agent);
routes.use('/api/role', role);
routes.use('/api/salesAgent/user', user);

// action service
routes.use('/api/actions', action);

// search service
routes.use('/api/search', search);

// things service
routes.use('/api/things',things)

// inventory service
routes.use('/api/inventory',inventory)


// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RUNNING ON PORT: ${PORT}`);
});
