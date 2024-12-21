import { getPool } from "../../configs/dbConfig.js";
import bcrypt from "bcryptjs";

const rePasswordById = async (req, res) => {
  const {  newPassword } = req.body;
  // Validate inputs
  const agentId = req.params.id;

  if (!agentId || !newPassword) {
    return res.status(400).json({ message: "Email and agentId are required." });
  }

  const pool = await getPool();

  try {



    // Proceed to update password
    const fetchUserQuery = `
      SELECT agent_id FROM account WHERE  agent_id = $1;
    `;
    const { rows } = await pool.query(fetchUserQuery, [agentId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const userId = rows[0].agent_id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const updatePasswordQuery = `
      UPDATE account SET password = $1 WHERE agent_id = $2;
    `;
    await pool.query(updatePasswordQuery, [hashedPassword, userId]);

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



// {
//   "email": "user@example.com",
//     "newPassword": "NewSecurePassword123!"
// }
export default rePasswordById;
