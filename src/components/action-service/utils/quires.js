// utils/dbQueries.js
import { getPool } from "../../../db/db.js";

// Initialize the database pool
const initPool = async () => {
  return await getPool();
};

export const dbQueries = {
  // Agent authorization check
  async checkAgentClientAuthorization(agent_id, client_id) {
    const pool = await initPool();
    
    const check_agent = (await pool.query(`SELECT agent_id FROM client WHERE id = $1;`, [client_id])).rows[0]?.agent_id;
    
    if (check_agent !== agent_id) {
      const check_agent_role = (await pool.query(`SELECT role_id FROM agent WHERE id = $1;`, [agent_id])).rows[0]?.role_id;
      if (check_agent_role == 2 || check_agent_role == 1) return true;
      return false;
    }
    
    return true;
  },

  // Action queries
  async getAllActionsForAgent(agent_id) {
    const pool = await initPool();
    const { rows } = await pool.query(`SELECT * FROM action WHERE agent_id = $1;`, [agent_id]);
    return rows;
  },

  async getTodayActionsForAgent(agent_id, today) {
    const pool = await initPool();
    const { rows } = await pool.query(`SELECT * FROM action WHERE agent_id = $1 AND date = $2;`, [agent_id, today]);
    return rows;
  },

  async getActionById(actionId) {
    const pool = await initPool();
    const { rows, rowCount } = await pool.query(`SELECT * FROM action WHERE id = $1;`, [actionId]);
    return rowCount ? rows[0] : null;
  },

  async insertAction(actionData) {
    const pool = await initPool();
    const {
      agent_id,
      client_id,
      unit_id,
      project_id,
      type_id,
      completed,
      answered,
      location,
      comment,
      date,
      time
    } = actionData;

    const query = `
      INSERT INTO action (agent_id, client_id, unit_id, project_id, type_id, completed, answered, location, comment, date, time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const values = [
      agent_id,
      client_id,
      unit_id,
      project_id,
      type_id,
      completed,
      answered,
      location,
      comment,
      date,
      time
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async getClientActions(clientId) {
    const pool = await initPool();
    const { rows } = await pool.query(`SELECT * FROM action WHERE client_id = $1`, [clientId]);
    return rows;
  },

  async getClientIncompleteActions(clientId) {
    const pool = await initPool();
    const { rows } = await pool.query(`SELECT * FROM action WHERE client_id = $1 AND completed IS false`, [clientId]);
    return rows;
  },

  async updateAction(actionId, updateData) {
    const pool = await initPool();
    const { completed, answered, comment, status_id } = updateData;
    
    const query = `
      UPDATE action
      SET 
        completed = $1,
        answered = $2,
        comment = $3,
        status_id = $4
      WHERE id = $5
      RETURNING *;
    `;
    
    const { rows } = await pool.query(query, [completed, answered, comment, status_id, actionId]);
    return rows[0];
  },

  async insertClientAgentUnit(unitData) {
    const pool = await initPool();
    const {
      client_id,
      status_id,
      project_id,
      unit_id,
      cancel_reason,
      agent_id,
      reservation_amount
    } = unitData;

    const query = `
      INSERT INTO client_agent_unit (
        client_id, status_id, project_id, unit_id, cancel_reason, agent_id, reservation_amount
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    
    const values = [
      client_id,
      status_id,
      project_id,
      unit_id,
      cancel_reason,
      agent_id,
      reservation_amount
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async updateClientNatId(clientId, natId) {
    const pool = await initPool();
    const query = `UPDATE client SET nat_id = $1 WHERE id = $2 RETURNING *;`;
    const { rows } = await pool.query(query, [natId, clientId]);
    return rows[0];
  }
};