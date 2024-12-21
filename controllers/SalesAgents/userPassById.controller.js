import { getPool } from "../../configs/dbConfig.js";


const getUserPassById = async (req, res) => {
    const AgentId = req.params.id;
    if (!AgentId) {
        return res.status(400).json({ message: "Agent Id is required." });
    }

    const pool = await getPool();
    try {
        const fetchAgentById = `SELECT * FROM account WHERE id = $1;`;

        const { rows } = await pool.query(fetchAgentById, [AgentId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Agent not found." });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching Agent:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



const updateUserPassById = async (req, res) => {
    const userId = req.params.id; // ID of the user to update
    const user = req.body; // Data to update

    if (!userId) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    if (!user || Object.keys(user).length === 0) {
        return res.status(400).json({ message: "No fields provided to update." });
    }

    try {
        const pool = await getPool();

        // Exclude "id" and "created_at" from the update
        const excludeFields = ["id", "created_at"];
        const filteredUser = Object.keys(user)
            .filter((key) => !excludeFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = user[key];
                return obj;
            }, {});

        if (Object.keys(filteredUser).length === 0) {
            return res.status(400).json({ message: "No valid fields to update." });
        }

        // Dynamically build the SET clause
        const setClause = Object.keys(filteredUser)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");

        const values = [...Object.values(filteredUser), userId];

        const updateUserQuery = `
            UPDATE agent
            SET ${setClause}
            WHERE id = $${values.length};
        `;

        console.log("Update Query:", updateUserQuery);
        console.log("Values:", values);

        // Execute the query
        const result = await pool.query(updateUserQuery, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "User updated successfully." });
    } catch (err) {
        console.error("Error updating user:", err.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};


export { updateUserDataById, getUserDataById };
