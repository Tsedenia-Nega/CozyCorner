import express from 'express';
import { validate } from '../middlewares/authMiddleware.js';
import { registerSchema, loginSchema } from '../utils/validators.js';    
import {register,login} from '../controllers/authController.js';
const router = express.Router();
router.post('/register',validate(registerSchema),register);
router.post('/login',validate(loginSchema),login);
export default router;