import * as services from "../services/things.services.js";

export const getCities = async (req, res) => {
    console.log("Fetching cities");
    
    try {
        const cities = await services.getAllCities();
        
        if (cities.length === 0) {
            return res.status(404).json({ message: "No cities found." });
        }
        
        res.status(200).json({ cities });
    } catch (error) {
        console.error("Error fetching cities:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// controllers/things/status.controller.js

export const getAgentStatuses = async (req, res) => {
    try {
        const statuses = await services.getAgentStatuses();
        res.status(200).json({ statuses });
    } catch (error) {
        console.error("Error fetching agent statuses:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

// controllers/things/taskStatus.controller.js

export const getTaskStatuses = async (req, res) => {
    try {
        const statuses = await services.getTaskStatuses();
        res.status(200).json({ statuses });
    } catch (error) {
        console.error("Error fetching task statuses:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};
