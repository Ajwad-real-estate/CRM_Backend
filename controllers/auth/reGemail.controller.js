import { getPool } from "../../configs/dbConfig.js";

const reGemail = async (req, res) => {

  const { currentEmail, newEmail } = req.body;
  const userId = req.user.agentId; // Extract userId from the authenticated user
  // Validate inputs
  if (!newEmail || !currentEmail) {
    return res.status(400).json({
      message: "New email and either userId or current email are required.",
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
    userCheckQuery = `
  SELECT agent_id FROM account WHERE (agent_id = $1 OR $1 IS NULL) AND email = $2;
`;
    userCheckParams = [userId, currentEmail];
    // } else {
    // userCheckQuery = `SELECT agent_id FROM account WHERE email = $1;`;
    // userCheckParams = [currentEmail];
    // // }

    const userCheckResult = await pool.query(userCheckQuery, userCheckParams);

    if (userCheckResult.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "you enter wrong email. Please check your inputs." });
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


export default reGemail;
