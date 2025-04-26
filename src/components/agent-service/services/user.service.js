import { getPool } from "../../../db/db.js";
import { getUserByIdQuery } from "../utils/queries/user.queries.js";

export const getUserByIdService = async (agentId) => {
  const pool = await getPool();
  const { rows } = await pool.query(getUserByIdQuery, [agentId]);

  if (rows.length === 0) {
    return { status: 404, body: { message: "Agent not found." } };
  }

  return { status: 200, body: rows[0] };
};

export const updateUserByIdService = async (userId, userData) => {
  if (!userId) {
    return { status: 400, body: { message: "Invalid user ID." } };
  }

  if (!userData || Object.keys(userData).length === 0) {
    return { status: 400, body: { message: "No fields provided to update." } };
  }

  const excludeFields = ["id", "created_at"];
  const filteredUser = Object.keys(userData)
    .filter((key) => !excludeFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = userData[key];
      return obj;
    }, {});

  if (Object.keys(filteredUser).length === 0) {
    return { status: 400, body: { message: "No valid fields to update." } };
  }

  const setClause = Object.keys(filteredUser)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = [...Object.values(filteredUser), userId];

  const updateQuery = `
    UPDATE agent
    SET ${setClause}
    WHERE id = $${values.length};
  `;

  const pool = await getPool();
  const result = await pool.query(updateQuery, values);

  if (result.rowCount === 0) {
    return { status: 404, body: { message: "User not found." } };
  }

  return { status: 200, body: { message: "User updated successfully." } };
};
