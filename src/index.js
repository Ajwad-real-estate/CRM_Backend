import { Router } from "express";
import authRoutes from "./routes/auth/index.js";
import getSalesAgents from "../controllers/getSalesAgents/getSalesAgents.controller.js";

const router = Router();

// Base route
router.get("/", (req, res) => {
  res.send("Welcome to the CRM API.");
});

// Auth routes
router.use("/auth", authRoutes);
router.use("/data", getSalesAgents);

export default router;
