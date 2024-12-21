import { getPool } from "../../configs/dbConfig.js";
import bcrypt from "bcryptjs";

const handleRegister = async (req, res) => {
  const manager_id_from_userpayload = req.user.agentId;

  const {
    username,
    email,
    password,
    name,
    roleId,
    cityId,
    street,
    phoneNumbers,
    manager_id = manager_id_from_userpayload,
  } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    !name ||
    !roleId ||
    !cityId ||
    !street ||
    !phoneNumbers ||

    phoneNumbers.length < 1
  )
    return res.status(400).json({ message: "All fields are required." });

  const pool = await getPool();

  try {
    // Check if the username or email already exists and taken by any user
    // const userCheckQuery = `
    //   SELECT username, email FROM account WHERE username = $1 OR email = $2;
    // `;
    const userCheckQuery = `
      SELECT
          a.username,
          a.email,
          ap.phone_number
      FROM
          account AS a
      LEFT JOIN
          defaultdb.public.agent_phone AS ap
      ON
          a.agent_id = ap.agent_id
      WHERE
          a.username = $1
          OR a.email = $2
          OR ap.phone_number = ANY ($3::text[]);
    `;
    const { rows } = await pool.query(userCheckQuery, [username, email, phoneNumbers,]);

    console.log(rows);
    console.log(rows.length);

    let isUsernameTaken = false;
    let isEmailTaken = false;
    const duplicatePhoneNumbers = [];

    if (rows.length > 0) {
      rows.forEach((user) => {
        if (user.username === username) {
          isUsernameTaken = true;
        }
        if (user.email === email) {
          isEmailTaken = true;
        }
        if (user.phone_number && phoneNumbers.includes(user.phone_number)) {
          duplicatePhoneNumbers.push(user.phone_number);
        }
      });
    }

    if (isUsernameTaken && isEmailTaken && duplicatePhoneNumbers.length > 0) {
      return res.status(409).json({
        message: "Username email, and phone numbers are already taken.",
        duplicatePhoneNumbers,
      });
    }
    if (isUsernameTaken) {
      return res.status(409).json({ message: "Username is already taken." });
    }
    if (isEmailTaken) {
      return res.status(409).json({ message: "Email is already taken." });
    }
    if (duplicatePhoneNumbers.length > 0) {
      return res.status(409).json({
        message: "Phone numbers are already taken.",
        duplicatePhoneNumbers,
      });
    }

    // Create new agent and return it's id as agentId
    const createAgentQuery = `
      INSERT INTO agent (name, role_id, city_id, street,manager_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING id  
    `;
    const createAgentResult = await pool.query(createAgentQuery, [
      name,
      roleId,
      cityId,
      street,
      manager_id,
    ]);
    const agentId = createAgentResult.rows[0].id;

    // Create acount using agentId and it's credentials
    const hashedPassword = await bcrypt.hash(password, 10);

    const createAccountQuery = `
      INSERT INTO account (username, agent_id, email, password)
      VALUES ($1, $2, $3, $4);
    `;
    const tempResult = await pool.query(createAccountQuery, [
      username,
      agentId,
      email,
      hashedPassword,
    ]);

    // Insert agent's phone numbers
    const phoneInsertQuery = `
        INSERT INTO agent_phone (agent_id, phone_number)
        VALUES ($1, $2);
      `;
    const phoneInsertPromises = phoneNumbers.map((phoneNumber) =>
      pool.query(phoneInsertQuery, [agentId, phoneNumber])
    );

    // Wait for all phone number inserts to complete
    await Promise.all(phoneInsertPromises);

    res.status(201).json({
      message: "Agent registered successfully.",
    });
  } catch (error) {
    console.error("Error during agent registration:", error);
    res.status(500).json({ message: "Internal server error. Please check Phone number field are it duplicate ?" });
  }
};

export default handleRegister;
