import { getPool } from "../../../db/db.js";
import * as Queries from "../utils/quires/inventory.quires.js";

export const fetchProjectIDS = async () => {
    const pool = await getPool();
  
    const { rows: projects } = await pool.query(Queries.getAllProjectsIDS);
  
    return {
      status: 200,
      body: { projects },
    };
  };


  export const fetchAllUnitsIDS = async (req) => {
    const id = req.params.id;

    const pool = await getPool();
  
    const ID = `${id}`;
  
    const { rows: units } = await pool.query(Queries.getAllUnitsForProject,[ID]);
  
    return {
      status: 200,
      body: { units },
    };
  };