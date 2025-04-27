import express from 'express';
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

const app = express();

app.use(express.json());

// Create a new router
const apiRouter = express.Router();

// user service
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);

// client service
apiRouter.use('/clients', clientRoute);

// task service
apiRouter.use('/tasks', task);

// dashboard service
apiRouter.use('/dashboard', dashboardRoute);

// agent service
apiRouter.use('/salesAgent', agent);
apiRouter.use('/role', role);
apiRouter.use('/salesAgent/user', user);

// action service
apiRouter.use('/actions', action);

// search service
apiRouter.use('/search', search);

// things service
apiRouter.use('/things',things)

// Mount the API router under `/api`
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.listen(3000, () => {
  console.log("app listens on port 3000");
});

export default app;
