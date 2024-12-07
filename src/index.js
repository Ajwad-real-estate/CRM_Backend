import { Router } from "express";
import authRoutes from "./routes/auth/index.js";

const router = Router();

// Base route
router.get("/", (req, res) => {
  res.send("Welcome to the CRM API.");
});

// Auth routes
router.use("/auth", authRoutes);

export default router;
