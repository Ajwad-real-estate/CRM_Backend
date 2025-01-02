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
      else if (status == 'New' || status == 'new') {
        conditions.push("c.status_id = $1");
        values.push(1);
      }
      else if (status == 'Qualified' || status == 'qualified') {
        conditions.push("c.status_id = $1");
        values.push(2);
      }
      else if (status == 'Reserved' || status == 'reserved') {
        conditions.push("c.status_id = $1");
        values.push(3);
      }
      else if (status == 'Done Deal' || status == 'done deal' || status == 'done_deal' || status == 'done-deal') {
        conditions.push("c.status_id = $1");
        values.push(4);
      }
      else if (status == 'Archieved' || status == 'archieved') {
        conditions.push("c.status_id = $1");
        values.push(5);
      }
      else if (status == 'Lost' || status == 'lost') {
        conditions.push("c.status_id = $1");
        values.push(6);
      }
      else if (status == 'Canceled' || status == 'canceled') {
        conditions.push("c.status_id = $1");
        values.push(7);
      }
      else if (status) {
        conditions.push("c.status_id = $1");
        values.push(status);
      }
    } else if (roleId === 3) {
      conditions.push("c.agent_id = $1");
      values.push(agentId);
      
      if (status == 'New' || status == 'new') {
        conditions.push("c.status_id = $2");
        values.push(1);
      }
      else if (status == 'Qualified' || status == 'qualified') {
        conditions.push("c.status_id = $2");
        values.push(2);
      }
      else if (status == 'Reserved' || status == 'reserved') {
        conditions.push("c.status_id = $2");
        values.push(3);
      }
      else if (status == 'Done Deal' || status == 'done deal' || status == 'done_deal' || status == 'done-deal') {
        conditions.push("c.status_id = $2");
        values.push(4);
      }
      else if (status == 'Archieved' || status == 'archieved') {
        conditions.push("c.status_id = $2");
        values.push(5);
      }
      else if (status == 'Lost' || status == 'lost') {
        conditions.push("c.status_id = $2");
        values.push(6);
      }
      else if (status == 'Canceled' || status == 'canceled') {
        conditions.push("c.status_id = $2");
        values.push(7);
      }
      else if (status) {
        conditions.push("c.status_id = $2");
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
