import { getPool } from "../../configs/dbConfig.js";

const reGemailById = async (req, res) => {

  const { newEmail } = req.body;
  const userId = req.params.id; // Extract userId from the authenticated user
  // Validate inputs
  console.log(" newEmail")
  console.log(newEmail)
  if (!newEmail) {
    return res.status(400).json({
      message: "New email are required.",
    });
  }

  const pool = await getPool();

  try {
    // Check if the new email is already taken
    const emailCheckQuery = `SELECT email FROM account WHERE email = $1;`;
    const emailCheckResult = await pool.query(emailCheckQuery, [newEmail]);



    // Check if the user exists using userId or currentEmail
    let userCheckQuery;
    let userCheckParams;

    // if (userId) {
    userCheckQuery = `SELECT agent_id FROM account WHERE agent_id = $1;`;
    userCheckParams = [userId];
    // } else {

    const userCheckResult = await pool.query(userCheckQuery, userCheckParams);

    if (userCheckResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found. Please check your inputs." });
    }

    if (emailCheckResult.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "The new email is already in use by another account." });
    }

    const userIdToUpdate = userCheckResult.rows[0].agent_id;

    // Update the email in the database
    const updateEmailQuery = `
      UPDATE account
      SET email = $1
      WHERE agent_id = $2;
    `;
    await pool.query(updateEmailQuery, [newEmail, userIdToUpdate]);

    res.status(200).json({ message: "Email updated successfully." });
  } catch (error) {
    console.error("Error during email update:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
// Example API Request
// Endpoint: POST / api / regemail
// Body:

// json
// Copy code
// {
//     "newEmail": "newuser@example.com"
// }
// OR

// json
// Copy code
// {
//   "currentEmail": "current@example.com",
//     "newEmail": "newuser@example.com"
// }


export default reGemailById;
