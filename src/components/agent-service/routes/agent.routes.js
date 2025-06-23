import express from "express";
import {
  createSalesAccount,
  getSalesAgents,
} from "../controllers/salesAgent.controller.js";
import { authorizeUser } from "../../user-service/middleware/authorizeUser.js";
const agent = express.Router();

agent.post("/register-sales",authorizeUser ,createSalesAccount);

agent.get("/sales-agents", authorizeUser, getSalesAgents);

export default agent;
