import { getPool } from '../../../db/db.js';
import bcrypt from 'bcryptjs';
import { 
  generateAccessToken, 
  generateRefreshToken,
  verifyRefreshToken 
} from '../utils/authUtils.js';
import { AUTH_QUERIES } from '../utils/queries.js';

export const loginUser = async (identifier, password) => {
  const pool = await getPool();
  
  if (!identifier || !password) {
    throw { status: 400, message: "All fields are required." };
  }

  const { rows: accounts } = await pool.query(
    AUTH_QUERIES.GET_USER_BY_IDENTIFIER,
    [identifier]
  );

  if (accounts.length < 1) {
    throw { status: 401, message: "Wrong identifier." };
  }

  const { username, agent_id: agentId, password: hashedPassword } = accounts[0];
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    throw { status: 401, message: "Wrong password." };
  }

  const { rows: agents } = await pool.query(
    AUTH_QUERIES.GET_AGENT_DETAILS,
    [agentId]
  );

  const { title: role, id: roleId } = agents[0];
  const userPayload = { username, agentId, role, roleId };

  const accessToken = generateAccessToken(userPayload);
  const refreshToken = generateRefreshToken(userPayload);

  await pool.query(AUTH_QUERIES.INSERT_REFRESH_TOKEN, [refreshToken]);

  return { 
    accessToken, 
    refreshToken, 
    user: userPayload 
  };
};

export const logoutUser = async (refreshToken) => {
  const pool = await getPool();
  
  if (!refreshToken) {
    throw { status: 400, message: "Refresh token is required." };
  }

  const { rowCount } = await pool.query(
    AUTH_QUERIES.DELETE_REFRESH_TOKEN,
    [refreshToken]
  );

  if (rowCount === 0) {
    throw { status: 404, message: "Refresh Token not found." };
  }
};

export const refreshToken = async (refreshToken) => {
  const pool = await getPool();
  
  if (!refreshToken) {
    throw { status: 401, message: "Refresh token is required." };
  }

  const { rows } = await pool.query(
    AUTH_QUERIES.CHECK_REFRESH_TOKEN,
    [refreshToken]
  );

  if (rows.length < 1) {
    throw { status: 403, message: "Invalid refresh token." };
  }

  const { refresh_token: token } = rows[0];
  const accessToken = await verifyRefreshToken(token);

  return { accessToken };
};