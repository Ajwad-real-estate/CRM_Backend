import { Router } from "express";
import authRoutes from "./routes/auth/index.js";
import getSalesAgents from "../controllers/SalesAgents/getSalesAgents.controller.js";
import createSalesAccount from "../controllers/SalesAgents/createSalesAccount.controller.js";

const router = Router();

// Base route
router.get("/", (req, res) => {
  res.send("Welcome to the CRM API.");
});

// Auth routes
router.use("/auth", authRoutes);
router.use("/get-sales-agents-details", getSalesAgents);// need it make it authorized to manager only?
router.post("/create-sales-account", createSalesAccount); // Apply authorizeManager middleware here


export default router;
