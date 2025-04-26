import express from "express";
import { createSalesAccount , getSalesAgents } from "../controllers/salesAgent.controller.js";
const agent = express.Router();

agent.post("/register-sales", createSalesAccount);

agent.get("/sales-agents", getSalesAgents);

export default agent;
