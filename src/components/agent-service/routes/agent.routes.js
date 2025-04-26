import express from "express";
import { createSalesAccount } from "../controllers/salesAgent.controller.js";
const agent = express.Router();

agent.post("/register-sales", createSalesAccount);

agent.get("/sales-agents", getSalesAgents);

export default agent;
