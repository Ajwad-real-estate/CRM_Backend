import { getPool } from '../../../db/db.js';
import bcrypt from 'bcryptjs';
import { USER_QUERIES } from '../utils/queries.js';


export const registerUser = async (userData) => {
  const pool = await getPool();
  const {
    username,
    email,
    password,
    name,
    roleId,
    cityId,
    street,
    phoneNumbers,
    manager_id
  } = userData;

  // Validate required fields
  if (!username || !email || !password || !name || !roleId || !cityId || !street || !phoneNumbers || phoneNumbers.length < 1) {
    throw { status: 400, message: "All fields are required." };
  }

  // Check for existing username, email, or phone numbers
  const { rows } = await pool.query(
    USER_QUERIES.CHECK_USER_EXISTS,
    [username, email, phoneNumbers]
  );

  let isUsernameTaken = false;
  let isEmailTaken = false;
  const duplicatePhoneNumbers = [];

  rows.forEach((user) => {
    if (user.username === username) isUsernameTaken = true;
    if (user.email === email) isEmailTaken = true;
    if (user.phone_number && phoneNumbers.includes(user.phone_number)) {
      duplicatePhoneNumbers.push(user.phone_number);
    }
  });

  if (isUsernameTaken && isEmailTaken && duplicatePhoneNumbers.length > 0) {
    throw { 
      status: 409, 
      message: "Username, email, and phone numbers are already taken.",
      duplicatePhoneNumbers 
    };
  }
  if (isUsernameTaken) throw { status: 409, message: "Username is already taken." };
  if (isEmailTaken) throw { status: 409, message: "Email is already taken." };
  if (duplicatePhoneNumbers.length > 0) {
    throw { 
      status: 409, 
      message: "Phone numbers are already taken.",
      duplicatePhoneNumbers 
    };
  }

  // Insert new agent
  const { rows: [agent] } = await pool.query(
    USER_QUERIES.CREATE_AGENT,
    [name, roleId, cityId, street, manager_id]
  );

  // Hash the password and create the account
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    USER_QUERIES.CREATE_ACCOUNT,
    [username, agent.id, email, hashedPassword]
  );

  // Insert phone numbers
  await Promise.all(
    phoneNumbers.map((phoneNumber) =>
      pool.query(
        USER_QUERIES.ADD_PHONE_NUMBER,
        [agent.id, phoneNumber]
      )
    )
  );

  return { message: "Agent registered successfully." };
};

export const updateEmail = async (agentId, currentEmail, newEmail) => {
  const pool = await getPool();

  if (!newEmail || !currentEmail) {
    throw { 
      status: 400, 
      message: "New email and current email are required." 
    };
  }

  // Check if new email is already taken
  const { rows: emailCheck } = await pool.query(
    USER_QUERIES.CHECK_EMAIL_EXISTS,
    [newEmail]
  );

  if (emailCheck.length > 0) {
    throw { 
      status: 409, 
      message: "The new email is already in use by another account." 
    };
  }

  // Verify current email matches the user's account
  const { rows: userCheck } = await pool.query(
    USER_QUERIES.VERIFY_USER_EMAIL,
    [agentId, currentEmail]
  );

  if (userCheck.length === 0) {
    throw { 
      status: 404, 
      message: "You entered wrong email. Please check your inputs." 
    };
  }

  // Update email
  await pool.query(
    USER_QUERIES.UPDATE_EMAIL,
    [newEmail, agentId]
  );

  return { message: "Email updated successfully." };
};

export const updateEmailById = async (agentId, newEmail) => {
  const pool = await getPool();

  if (!newEmail) {
    throw { status: 400, message: "New email is required." };
  }

  // Check if new email is taken
  const { rows: emailCheck } = await pool.query(
    USER_QUERIES.CHECK_EMAIL_EXISTS,
    [newEmail]
  );

  if (emailCheck.length > 0) {
    throw { 
      status: 409, 
      message: "The new email is already in use by another account." 
    };
  }

  // Verify user exists
  const { rows: userCheck } = await pool.query(
    USER_QUERIES.VERIFY_USER_EXISTS,
    [agentId]
  );

  if (userCheck.length === 0) {
    throw { status: 404, message: "User not found." };
  }

  // Update email
  await pool.query(
    USER_QUERIES.UPDATE_EMAIL,
    [newEmail, agentId]
  );

  return { message: "Email updated successfully." };
};

export const updatePassword = async (agentId, email, newPassword) => {
  const pool = await getPool();

  if (!email || !newPassword) {
    throw { status: 400, message: "Email and new password are required." };
  }

  // Verify email matches the account
  const { rows } = await pool.query(
    USER_QUERIES.GET_USER_EMAIL,
    [agentId]
  );

  if (rows.length === 0 || rows[0].email !== email) {
    throw { status: 404, message: "It's not your email." };
  }

  // Hash and update password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await pool.query(
    USER_QUERIES.UPDATE_PASSWORD,
    [hashedPassword, agentId]
  );

  return { message: "Password updated successfully." };
};

export const updatePasswordById = async (agentId, newPassword) => {
  const pool = await getPool();

  if (!newPassword) {
    throw { status: 400, message: "New password is required." };
  }

  // Verify user exists
  const { rows } = await pool.query(
    USER_QUERIES.VERIFY_USER_EXISTS,
    [agentId]
  );

  if (rows.length === 0) {
    throw { status: 404, message: "User not found." };
  }

  // Hash and update password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await pool.query(
    USER_QUERIES.UPDATE_PASSWORD,
    [hashedPassword, agentId]
  );

  return { message: "Password updated successfully." };
};