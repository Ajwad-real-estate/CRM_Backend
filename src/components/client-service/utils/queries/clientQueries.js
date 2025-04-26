import { getPool } from "../../../../db/db.js"
// Client creation queries
export const checkExistingPhoneNumbers = async (phoneNumbers) => {
    const pool = await getPool();
    const { rows } = await pool.query(
      `SELECT phone_number 
       FROM client_phone 
       WHERE phone_number = ANY($1::text[])`,
      [phoneNumbers]
    );
    return rows;
  };
  
  export const insertClient = async (clientData) => {
    const pool = await getPool();
    const client = await pool.connect();
    
    try {
      await client.query("BEGIN");
      
      const {
        name,
        age,
        email,
        city_id,
        street,
        channel_id,
        type_id,
        status_id,
        budget
      } = clientData;
      
      const createClientQuery = `
        INSERT INTO client (name, age, email, city_id, street, channel_id, type_id, status_id, budget)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
      `;
      
      const createClientResult = await client.query(createClientQuery, [
        name,
        age,
        email,
        city_id,
        street,
        channel_id,
        type_id,
        status_id,
        budget,
      ]);
      
      await client.query("COMMIT");
      return createClientResult.rows[0].id;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  };
  
  export const insertClientPhones = async (clientId, phoneNumbers) => {
    const pool = await getPool();
    const client = await pool.connect();
    
    try {
      await client.query("BEGIN");
      
      const phoneInsertQuery = `
        INSERT INTO client_phone (client_id, phone_number)
        VALUES ($1, $2);
      `;
      
      const phoneInsertPromises = phoneNumbers.map((phoneNumber) =>
        client.query(phoneInsertQuery, [clientId, phoneNumber])
      );
      
      await Promise.all(phoneInsertPromises);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  };
  
  // Client fetching queries
  export const getClientByIdQuery = async (clientId) => {
    const pool = await getPool();
    const fetchClientById = `
      SELECT 
          c.*, 
          array_agg(cp.phone_number) AS phone_numbers
      FROM 
          client c
      LEFT JOIN 
          client_phone cp
      ON 
          c.id = cp.client_id
      WHERE 
          c.id = $1
      GROUP BY 
          c.id;`;
  
    const { rows } = await pool.query(fetchClientById, [clientId]);
    return rows;
  };
  
  export const getClientsQuery = async (roleId, agentId, statusFilter, assigned) => {
    const pool = await getPool();
    let query = `
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
    let paramIndex = 1;
  
    if (roleId === 1 || roleId === 2) {
      if (assigned === "false") conditions.push("c.agent_id IS NULL");
      else if (assigned === "true") conditions.push("c.agent_id IS NOT NULL");
      
      if (statusFilter) {
        conditions.push(`c.status_id = $${paramIndex}`);
        values.push(statusFilter);
        paramIndex++;
      }
    } else if (roleId === 3) {
      conditions.push(`c.agent_id = $${paramIndex}`);
      values.push(agentId);
      paramIndex++;
      
      if (statusFilter) {
        conditions.push(`c.status_id = $${paramIndex}`);
        values.push(statusFilter);
        paramIndex++;
      }
    }
  
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}\n`;
    }
  
    query += `GROUP BY c.id;`;
  
    const { rows } = await pool.query(query, values);
    return rows;
  };
  
  // Client update queries
  export const updateClientQuery = async (clientId, updateData) => {
    const pool = await getPool();
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const updateFields = Object.keys(updateData)
        .map((key, index) => `${key} = $${index + 2}`);
        
      const updateQuery = `
        UPDATE client 
        SET ${updateFields.join(', ')},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *;
      `;
      
      const values = [clientId, ...Object.values(updateData)];
      await client.query(updateQuery, values);
      
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  };
  
  export const deleteClientPhonesQuery = async (clientId) => {
    const pool = await getPool();
    return await pool.query(
      'DELETE FROM client_phone WHERE client_id = $1',
      [clientId]
    );
  };
  
  export const insertClientPhonesQuery = async (clientId, phoneNumbers) => {
    const pool = await getPool();
    const phoneValuesParams = phoneNumbers
      .map((_, index) => `($1, $${index + 2})`)
      .join(',');
      
    const phoneQuery = `
      INSERT INTO client_phone (client_id, phone_number)
      VALUES ${phoneValuesParams}
    `;
    
    return await pool.query(phoneQuery, [clientId, ...phoneNumbers]);
  };
  
  export const getUpdatedClientWithPhonesQuery = async (clientId) => {
    const pool = await getPool();
    const query = `
      SELECT 
        c.*, 
        array_agg(CASE WHEN cp.phone_number IS NOT NULL THEN cp.phone_number END) AS phone_numbers
      FROM 
        client c
      LEFT JOIN 
        client_phone cp
      ON 
        c.id = cp.client_id
      WHERE 
        c.id = $1
      GROUP BY 
        c.id;
    `;
    
    const { rows } = await pool.query(query, [clientId]);
    return rows;
  };
  
  // Client deletion query
  export const deleteClientQuery = async (clientId) => {
    const pool = await getPool();
    const deleteClientQuery = `DELETE FROM client WHERE id = $1;`;
    return await pool.query(deleteClientQuery, [clientId]);
  };
  
  // Client assignment query
  export const assignClientsToAgentsQuery = async (assignments, assignTime) => {
    const pool = await getPool();
    const query = `
      UPDATE client
      SET agent_id = CASE id
        ${assignments
          .map(
            ({ clientId, agentId }) =>
              `WHEN '${clientId}' THEN '${agentId}'::uuid`
          )
          .join(" ")}
      END,
      assign_time = $1
      WHERE id IN (${assignments
        .map(({ clientId }) => `'${clientId}'`)
        .join(", ")});
    `;
  
    return await pool.query(query, [assignTime]);
  };