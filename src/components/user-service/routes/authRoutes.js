import express from 'express';
import {
  handleLogin,
  handleLogout,
  handleToken
} from '../controllers/authController.js';

const authRoutes = express.Router();

authRoutes.post('/login', handleLogin);
authRoutes.post('/logout', handleLogout);
authRoutes.post('/token', handleToken);

export default authRoutes