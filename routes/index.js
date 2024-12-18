import { Router } from "express";
import authRoutes from "./auth/index.js";

import authorizeUser from "../middlewares/authorizeUser.js";
import dashboardRoute from "./dashboard.js";
import getSalesAgentsRoute from "./SalesAgents/getSalesAgentsDataRoute.js";
import createSalesAccountRoute from "./SalesAgents/createSalesAccountRoute.js";
import taskRoute from "./task.js";
import actionRoute from "./action.js";
import clientRoutes from "./clients/index.js";

const router = Router();

// Base route
router.get("/", (req, res) => {
  res.send("Welcome to the CRM API.");
});

// Auth routes
router.use("/clients", clientRoutes);
router.use("/auth", authRoutes);
router.use(dashboardRoute);
router.use(taskRoute);
router.use(actionRoute);
router.use(getSalesAgentsRoute);
router.use(createSalesAccountRoute);
// router.use(userData);
export default router;
