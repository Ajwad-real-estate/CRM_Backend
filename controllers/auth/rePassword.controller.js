import { getPool } from "../../configs/dbConfig.js";
import bcrypt from "bcryptjs";

const rePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  // Validate inputs
  const agentId = req.user.agentId;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required." });
  }

  const pool = await getPool();

  try {
    // Check if the email matches for the given agentId
    const fetchEmailQuery = `
      SELECT email FROM account WHERE agent_id = $1;
    `;
    const { rows: emailRow } = await pool.query(fetchEmailQuery, [agentId]);

    if (emailRow.length === 0 || emailRow[0].email !== email) {
      return res.status(404).json({ message: "It’s not your email." });
    }


    // Proceed to update password
    const fetchUserQuery = `
      SELECT agent_id, email FROM account WHERE email = $1 AND agent_id = $2;
    `;
    const { rows } = await pool.query(fetchUserQuery, [email, agentId]);

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
export default rePassword;
