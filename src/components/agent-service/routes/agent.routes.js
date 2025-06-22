import express from "express";
import {
  createSalesAccount,
  getSalesAgents,
} from "../controllers/salesAgent.controller.js";
import { authorizeManager } from "../../user-service/middleware/authorizeManager.js";
const agent = express.Router();

agent.post("/register-sales", createSalesAccount);

agent.get("/sales-agents", authorizeManager, getSalesAgents);

export default agent;
