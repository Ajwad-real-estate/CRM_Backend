// utils/db.helper.js
import { getPool } from "../../../../db/db.js";

export const executeQuery = async (query, params = []) => {
    const pool = await getPool();
    const { rows } = await pool.query(query, params);
    return rows;
};