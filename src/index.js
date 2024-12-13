import { Router } from "express";
import authRoutes from "./routes/auth/index.js";
import dashboardRoute from "./routes/dashboard.js";import getSalesAgents from "../controllers/SalesAgents/getSalesAgents.controller.js";
import createSalesAccount from "../controllers/SalesAgents/createSalesAccount.controller.js";
import rolesTitles from "../controllers/SalesAgents/rolesTitles.controller.js";
import authorizeUser from "../middlewares/authorizeUser.js";

const router = Router();

// Base route
router.get("/", (req, res) => {
  res.send("Welcome to the CRM API.");
});

// Auth routes
router.use("/auth", authRoutes);

export default router;
