import { getPool } from "../../../db/db.js";
import * as Queries from "../utils/quires/search.quires.js";

export const fetchPhoneNumbers = async (req) => {
    const phoneNumber = req.params.phone;
    const pool = await getPool();
  
    const likePhone = `%${phoneNumber}%`;
    const { rows: clients } = await pool.query(Queries.getPhoneNumbers, [likePhone]);
  
    return {
      status: 200,
      body: { clients },
    };
  };
