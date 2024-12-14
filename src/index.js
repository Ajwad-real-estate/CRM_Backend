import { Router } from "express";
import authRoutes from "./routes/auth/index.js";

import authorizeUser from "../middlewares/authorizeUser.js";
import dashboardRoute from "./routes/dashboard.js";
import getSalesAgentsRoute from "./routes/SalesAgents/getSalesAgentsDataRoute.js";
import createSalesAccountRoute from "./routes/SalesAgents/createSalesAccountRoute.js";
<<<<<<< HEAD
// import userData from "./routes/SalesAgents/userData.js"
=======
import clientRoutes from "./routes/clients/index.js";

>>>>>>> origin/main
const router = Router();

// Base route
router.get("/", (req, res) => {
  res.send("Welcome to the CRM API.");
});

// Auth routes
router.use("/auth", authRoutes);
router.use(dashboardRoute);
router.use(getSalesAgentsRoute);
router.use(createSalesAccountRoute);
<<<<<<< HEAD
// router.use(userData);
=======
router.use("/clients", clientRoutes);
>>>>>>> origin/main
export default router;
