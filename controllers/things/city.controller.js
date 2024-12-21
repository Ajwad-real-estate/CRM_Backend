import { getPool } from "../../configs/dbConfig.js";

const getCities = async (req, res) => {
    console.log("Fetching cities");

    const pool = await getPool();

    try {
        const citiesQuery = `
      SELECT id, name
      FROM city
      ORDER BY name ASC;
    `;

        const { rows: cities } = await pool.query(citiesQuery);

        if (cities.length === 0) {
            return res.status(404).json({ message: "No cities found." });
        }

        res.status(200).json({ cities });
    } catch (error) {
        console.error("Error fetching cities:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default getCities;
