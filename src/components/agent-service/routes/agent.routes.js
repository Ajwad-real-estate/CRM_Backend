import express from "express";
import { createSalesAccount } from "../controllers/agent.controller";
const agent = express.Router();

agent.post("/register-sales", createSalesAccount);

agent.get("/sales-agents", getSalesAgents);

export default agent;
