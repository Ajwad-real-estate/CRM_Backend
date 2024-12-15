// const express = require('express');
import { sequelize } from './models';
// const taskRoutes = require('./routes/taskRoutes');
import express from "express";
import cors from "cors";

import routes from "./routes/index";

const app = express();
const PORT = 3000;




// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL during production
  credentials: true, // Allow cookies and other credentials
}));
app.use(express.json());

// API routes
app.use("/api", routes);

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.use(express.json());

// Use route handlers
app.use('/tasks', taskRoutes);

app.use('/api', routes)
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
