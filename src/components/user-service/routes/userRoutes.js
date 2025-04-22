import express from 'express';
import {
  handleRegister,
  reGemail,
  reGemailById,
  rePassword,
  rePasswordById
} from '../controllers/userController.js';
import { authorizeUser, authorizeManager } from '../middlewares/authorizeUser.js';

const router = express.Router();

router.post('/register', authorizeManager, handleRegister);
router.post('/regemail', authorizeUser, reGemail);
router.post('/regemail/:id', authorizeManager, reGemailById);
router.post('/repassword', authorizeUser, rePassword);
router.post('/repassword/:id', authorizeManager, rePasswordById);

export default router;