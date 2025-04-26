import * as services from '../service/search.service.js';

export const searchByPhoneNumber = async (req, res) => {
    try {
      const result = await services.fetchPhoneNumbers(req);
      res.status(result.status).json(result.body);
    } catch (err) {
      console.error("Error in controller:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  };