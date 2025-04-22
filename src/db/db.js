import pg from "pg";
import { config } from "../config";
const { Pool } = pg;

const pool = new Pool(config);

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export async function getPool() {
  return pool;
}

process.on("SIGINT", async () => {
  try {
    await pool.end();
    console.log("Database connection pool closed");
    process.exit(0);
  } catch (error) {
    console.error("Error closing database connection:", error);
    process.exit(1);
  }
});
