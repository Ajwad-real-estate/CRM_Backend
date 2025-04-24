import { getPool } from '../../../db/db';

export const createTask = async (taskData) => {
  const pool = await getPool();
  const { agent_id, title, detail, status_id, priority_id, date, time } = taskData;
  
  const query = `
    INSERT INTO task (agent_id, title, detail, status_id, priority_id, date, time)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  
  const values = [agent_id, title, detail, status_id, priority_id, date, time];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getTasksByAgent = async (agentId, filters) => {
  const pool = await getPool();
  
  let query = `
    SELECT * FROM task 
    WHERE agent_id = $1
  `;
  
  const values = [agentId];
  let paramIndex = 2;
  
  // Add filters if provided
  if (filters.status) {
    query += ` AND status_id = $${paramIndex}`;
    values.push(filters.status);
    paramIndex++;
  }
  
  if (filters.priority) {
    query += ` AND priority_id = $${paramIndex}`;
    values.push(filters.priority);
    paramIndex++;
  }
  
  query += ' ORDER BY created_at DESC';
  
  const { rows } = await pool.query(query, values);
  return rows;
};

export const getTaskById = async (taskId) => {
  const pool = await getPool();
  const { rows } = await pool.query('SELECT * FROM task WHERE id = $1', [taskId]);
  return rows[0];
};

export const updateTask = async (taskId, updates) => {
  const pool = await getPool();
  
  const setClause = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');
  
  const values = Object.values(updates);
  values.push(taskId);
  
  const query = `
    UPDATE task
    SET ${setClause}, updated_at = NOW()
    WHERE id = $${values.length}
    RETURNING *;
  `;
  
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteTask = async (taskId) => {
  const pool = await getPool();
  await pool.query('DELETE FROM task WHERE id = $1', [taskId]);
};