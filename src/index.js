import userRoutes from './components/user-service/routes/userRoutes.js';
import authRoutes from './components/user-service/routes/authRoutes.js';
import clientRoute from './components/client-service/routes/client.route.js';
import task from './components/task-service/routes/task.routes.js';
import dashboardRoute from "./components/dashboard-service/routes/dashboard.route.js";
import agent from './components/agent-service/routes/agent.routes.js';
import role from './components/agent-service/routes/roles.routes.js';
import user from './components/agent-service/routes/user.routes.js';
import action from './components/action-service/routes/action.route.js';
import search from './components/search-service/routes/search.route.js';
import things from './components/things-service/routes/things.routes.js';
import inventory from './components/inventory-service/routes/inventory.routes.js';
import { Router } from 'express';

app.use(cors({
  origin: 'https://ajw-ad.netlify.app',
  credentials: true, 
}));

// Create a new router
const routes = Router();

// user service
routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);

// client service
routes.use('/clients', clientRoute);

// task service
routes.use('/tasks', task);

// dashboard service
routes.use('/dashboard', dashboardRoute);

// agent service
routes.use('/salesAgent', agent);
routes.use('/role', role);
routes.use('/salesAgent/user', user);

// action service
routes.use('/actions', action);

// search service
routes.use('/search', search);

// things service
routes.use('/things',things)

// inventory service
routes.use('/inventory',inventory)

// Mount the API router under `/api`
//app.use('/api', routes); //for testing

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something broke!' });
// });

// app.listen(3000, () => {
//   console.log("app listens on port 3000");
// });

export default routes;
