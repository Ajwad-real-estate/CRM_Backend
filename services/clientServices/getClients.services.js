import { getPool } from "../../configs/dbConfig.js";

export const getClientsService = async (user) => {
  const pool = await getPool();

  const { role, id: agentId } = user;

  try {
    if (role === "manager") {
      const getAllClients = `SELECT * FROM client;`;
      const { rows } = await pool.query(getAllClients);

      return rows;
    } else {
      const getAgentClients = `SELECT * FROM client WHERE agent_id = $1`;
      const { rows } = await pool.query(getAgentClients, [agentId]);

      return rows;
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Unable to fetch clients. Please try again.");
  }
};
