// routes/auth.js
import express from 'express';
import { login, refreshToken,createUser } from '../controllers/authController.js';


const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/refresh", refreshToken); // New route

export default router;
