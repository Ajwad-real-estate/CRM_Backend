import express from 'express';
import userRoutes from './components/user-service/routes/userRoutes.js'
import authRoutes from './components/user-service/routes/authRoutes.js'
import clientRoute from './components/client-service/routes/client.route.js'
import task from './components/task-service/routes/task.routes.js'
import dashboardRoute from "./components/dashboard-service/routes/dashboard.route.js";
import agent from './components/agent-service/routes/agent.routes.js';
import role from './components/agent-service/routes/roles.routes.js';
import user from './components/agent-service/routes/user.routes.js';
import action from './components/action-service/routes/action.route.js'
import search from './components/search-service/routes/search.route.js';

const app = express();

app.use(express.json());

// user servcie
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// client service
app.use('/client',clientRoute)

// task service
app.use('/task',task)

// dashboard service
app.use('/dashboard',dashboardRoute)

// agent service
app.use('/salesAgent',agent)
app.use('/role',role)
app.use('/salesAgent/user',user)

// action service
app.use('/action',action)

// search service
app.use('/search',search)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.listen(3000,()=>{
    console.log("app listens on port 3000");
})

export default app;