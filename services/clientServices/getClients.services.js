import { getPool } from "../../configs/dbConfig.js";

export const getClientsService = async (user) => {
  const pool = await getPool();

  const { role, agentId: agentId } = user;
  console.log("user from getClientsService" + user)
  try {
    if (role === "Sales Manager") {
      const getAllClients = `SELECT * FROM client;`;
      const { rows } = await pool.query(getAllClients);

      return rows;

    } else {
      // const getAgentClients = `SELECT * FROM client WHERE agent_id = $1`;
      //     const getAgentClients = ` SELECT 
      //   c.*, 
      //   cp.phone_number
      // FROM 
      //   client c
      // LEFT JOIN 
      //   client_phone cp
      // ON 
      //   c.id = cp.client_id
      // WHERE 
      //   c.agent_id = $1`;
      const getAgentClients = `SELECT 
    c.*, 
    array_agg(cp.phone_number) AS phone_numbers
FROM 
    client c
LEFT JOIN 
    client_phone cp
ON 
    c.id = cp.client_id
WHERE 
    c.agent_id = $1
GROUP BY 
    c.id;`;

      const { rows } = await pool.query(getAgentClients, [agentId]);
      console.log(rows)
      return rows;
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Unable to fetch clients. Please try again.");
  }
};
