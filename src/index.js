import express from 'express';
import userRoutes from './components/user-service/routes/userRoutes.js'
import authRoutes from './components/user-service/routes/authRoutes.js'
import clientRoute from './components/client-service/index.js'
import task from './components/task-service/routes/task.routes.js'
import dashboardRoute from "./components/dashboard-service/routes/dashboard.route.js";

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use('/client',clientRoute)
app.use('/task',task)

app.use('/dashboard',dashboardRoute)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.listen(3000,()=>{
    console.log("app listens on port 3000");
})

export default app;