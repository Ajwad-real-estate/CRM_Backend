import { getPool } from "./configs/dbConfig.js";

(async () => {
  try {
    const pool = await getPool();
    const result = await pool.query("SELECT NOW()");
    console.log("Current Timestamp:", result.rows[0]);

		console.log('Total:', pool.totalCount); // Total connections
console.log('Idle:', pool.idleCount);   // Idle connections
console.log('Waiting:', pool.waitingCount); // Queued requests

  } catch (error) {
    console.error("Database test error:", error);
  }
})();
