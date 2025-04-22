import express from 'express';
import {
  handleLogin,
  handleLogout,
  handleToken
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.post('/token', handleToken);

export default router;