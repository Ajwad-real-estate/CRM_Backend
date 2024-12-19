import { getPool } from "../../configs/dbConfig.js";

const createSalesAccount = async (req, res) => {
    console.log("Creating Sales Account");

    // Extract manager_id from the user payload
    const manager_id_from_userpayload = req.user?.agentId;
    if (!manager_id_from_userpayload) {
        return res.status(400).json({ message: "Manager ID is required from user payload." });
    }

    const pool = await getPool();

    try {
        // Extract data from the request body with default values for city_id and street
        const { name, status, roleId, city_id = 2, street = 'street', manager_id = manager_id_from_userpayload } = req.body;

        // Validate the input
        if (!roleId) {
            return res.status(400).json({ message: "Role ID is required." });
        }
        if (!name) {
            return res.status(400).json({ message: "Name is required." });
        }

        // Insert query to create a new sales account
        const createQuery = `
            INSERT INTO agent (name, role_id, status, city_id, street, manager_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        // Execute the query to insert the new agent
        const { rows: newAgent } = await pool.query(createQuery, [name, roleId, status || "active", city_id, street, manager_id]);

        console.log("New Sales Agent Created:", newAgent[0]);

        // Respond with the newly created agent's details
        res.status(201).json({ agent: newAgent[0] });

    } catch (error) {
        console.error("Error creating sales account:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

export default createSalesAccount;
