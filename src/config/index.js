import dotenv from "dotenv";

dotenv.config();

export const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT, 10),
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
  max: process.env.PGPOOLMAX, // Max connections in the pool
  min: process.env.PGPOOLMIN, // Min connections in the pool
  idleTimeoutMillis: process.env.PGIDLEOUT,
};
