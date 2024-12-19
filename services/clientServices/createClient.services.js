import { getPool } from "../../configs/dbConfig.js";

export const createClientService = async (clientData) => {
  const {
    name,
    age,
    email,
    city_id,
    street,
    channel,
    type,
    status,
    budget,
    phoneNumbers,
  } = clientData;

  console.log(phoneNumbers);

  // if (!name) throw new Error("Name is required.");
  if (!phoneNumbers || phoneNumbers.length < 1)
    throw new Error("Phone number is required.");

  const pool = await getPool();

  try {
    await pool.query("BEGIN"); // Start transaction

    // Check if any phone number already exists
    const { rows: existingRows } = await pool.query(
      `SELECT phone_number 
       FROM client_phone 
       WHERE phone_number = ANY($1::text[])`,
      [phoneNumbers]
    );

    if (existingRows.length > 0) {
      const existingNumbers = existingRows.map((row) => row.phone_number);
      throw new Error(
        `Some phone numbers already exist: ${existingNumbers.join(", ")}`
      );
    }

    // Insert client into database
    const createClientQuery = `
      INSERT INTO client (name, age, email, city_id, street, channel, type, status, budget)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
    `;
    const createClientResult = await pool.query(createClientQuery, [
      name,
      age,
      email,
      city_id,
      street,
      channel,
      type,
      status,
      budget,
    ]);

    const clientId = createClientResult.rows[0].id;

    // Insert client's phone numbers
    const phoneInsertQuery = `
      INSERT INTO client_phone (client_id, phone_number)
      VALUES ($1, $2);
    `;
    const phoneInsertPromises = phoneNumbers.map((phoneNumber) =>
      pool.query(phoneInsertQuery, [clientId, phoneNumber])
    );
    await Promise.all(phoneInsertPromises);

    await pool.query("COMMIT"); // Commit transaction
    return { clientId, message: "Client created successfully." };
  } catch (error) {
    console.log("here");
    await pool.query("ROLLBACK"); // Rollback transaction in case of error
    throw error; // Re-throw the error to handle in the controller
  }
};
