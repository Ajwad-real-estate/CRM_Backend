import { getPool } from "../../../db/db.js";
import * as Queries from "../utils/queries/salesAgent.queries.js";
import { validateSalesInput, checkDuplicates } from "../utils/helpers/agent.helper.js";
import bcrypt from "bcrypt";

export const registerSalesAgent = async (req) => {
  const {
    username, email, password, name, roleId, cityId, street, phoneNumbers,
  } = req.body;
  const manager_id = req.user.agentId;

  if (!validateSalesInput(req.body)) {
    return {
      status: 400,
      body: { message: "All fields are required." },
    };
  }

  const pool = await getPool();
  const { rows } = await pool.query(Queries.checkUserAndPhonesQuery, [
    username,
    email,
    phoneNumbers,
  ]);

  const check = checkDuplicates(rows, { username, email, phoneNumbers });

  if (check.hasConflict) {
    return {
      status: 409,
      body: check.responseBody,
    };
  }

  const agentResult = await pool.query(Queries.insertAgentQuery, [
    name, roleId, cityId, street, manager_id,
  ]);
  const agentId = agentResult.rows[0].id;

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(Queries.insertAccountQuery, [
    username, agentId, email, hashedPassword,
  ]);

  await Promise.all(
    phoneNumbers.map((phone) =>
      pool.query(Queries.insertPhoneQuery, [agentId, phone])
    )
  );

  return {
    status: 201,
    body: { message: "Agent registered successfully." },
  };
};



export const fetchSalesAgents = async (req) => {
  const managerId = req.user.agentId;
  const pool = await getPool();

  const { rows: agents } = await pool.query(Queries.getAgentsUnderManagerQuery, [managerId]);

  return {
    status: 200,
    body: { agents },
  };
};