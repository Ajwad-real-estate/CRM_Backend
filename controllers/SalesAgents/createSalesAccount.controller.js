import { getPool } from "../../configs/dbConfig.js";

const createSalesAccount = async (req, res) => {
    console.log("Creating Sales Account");
    const pool = await getPool();

    try {
        // Extract data from the request body
        const { name, status, roleId } = req.body;

        // Validate the input
        if (!name || !roleId) {
            return res.status(400).json({ message: "Name and Role ID are required." });
        }

        // Insert query to create a new sales account
        const createQuery = `
      INSERT INTO agent (name, role_id, status)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

        // Execute the query
        const { rows: newAgent } = await pool.query(createQuery, [name, roleId, status || "active"]);

        console.log("New Sales Agent Created:", newAgent[0]);

        // Respond with the newly created agent's details
        res.status(201).json({ agent: newAgent[0] });
    } catch (error) {
        console.error("Error creating sales account:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export default createSalesAccount;
