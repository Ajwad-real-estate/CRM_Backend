import express from 'express';
import {
  handleRegister,
  reGemail,
  reGemailById,
  rePassword,
  rePasswordById
} from '../controller/userContoller.js';
import { authorizeUser } from '../middleware/authorizeUser.js';
import { authorizeManager } from '../middleware/authorizeManager.js'

const userRoutes = express.Router();

userRoutes.post('/register', handleRegister);
userRoutes.post('/regemail', authorizeUser, reGemail);
userRoutes.post('/regemail/:id', authorizeManager, reGemailById);
userRoutes.post('/repassword', authorizeUser, rePassword);
userRoutes.post('/repassword/:id', authorizeManager, rePasswordById);

export default userRoutes;