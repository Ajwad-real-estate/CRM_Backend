import { getPool } from "../../configs/dbConfig.js";

export const getClientsService = async (user, filters) => {
  const pool = await getPool();

  const { roleId, agentId: agentId } = user;
  const { status, assigned } = filters;

  try {
    let getClientsQuery = `
        SELECT 
            c.*, 
            array_agg(cp.phone_number) AS phone_numbers
        FROM 
            client c
        LEFT JOIN 
            client_phone cp
        ON 
            c.id = cp.client_id
    `;

    const conditions = [];
    const values = [];

    if (roleId === 1 || roleId === 2) {
      if (assigned === "false") conditions.push("c.agent_id IS NULL");
      else if (assigned === "true") conditions.push("c.agent_id IS NOT NULL");
      else if (status) {
        conditions.push("c.status = $1");
        values.push(status);
      }
    } else if (roleId === 3) {
      conditions.push("c.agent_id = $1");
      values.push(agentId);
      if (status) {
        conditions.push("c.status = $2");
        values.push(status);
      }
    }

    if (conditions.length > 0) {
      getClientsQuery += ` WHERE ${conditions.join(" AND ")}\n`;
    }

    getClientsQuery += `GROUP BY c.id;`;

    console.log("Final Query:", getClientsQuery);
    console.log("Values:", values);

    const { rows } = await pool.query(getClientsQuery, values);

    return rows;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Unable to fetch clients. Please try again.");
  }
};
