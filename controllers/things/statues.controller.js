import { getPool } from "../../configs/dbConfig.js";

const Statues = async (req, res) => {
    try {
        const pool = await getPool();

        const query = `
            SELECT id, name
            FROM agent_status 
            ;
        `;

        const result = await pool.query(query);

        return res.status(200).json({
            statuses: result.rows
        });
    } catch (err) {
        console.error("Error fetching agent statuses:", err.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};
export default Statues;
