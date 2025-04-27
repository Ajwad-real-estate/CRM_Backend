import * as services from '../services/inventory.services.js';

export const getAllProjectsIDS = async (req, res) => {
    try {
      const result = await services.fetchProjectIDS();
      res.status(result.status).json(result.body);
    } catch (err) {
      console.error("Error in controller:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  };

export const getAllUnitsIDS = async (req, res) => {
    try {
      const result = await services.fetchAllUnitsIDS(req);
      res.status(result.status).json(result.body);
    } catch (err) {
      console.error("Error in controller:", err);
      res.status(500).json({ message: "Internal server error." });
    }
};