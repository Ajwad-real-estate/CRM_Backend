import * as SalesService from "../services/salesAgent.service.js";

export const createSalesAccount = async (req, res) => {
  try {
    const result = await SalesService.registerSalesAgent(req);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("Error in controller:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getSalesAgents = async (req, res) => {
  try {
    const result = await SalesService.fetchSalesAgents(req);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("Error in controller (getSalesAgents):", err);
    res.status(500).json({ message: "Internal server error." });
  }
};
