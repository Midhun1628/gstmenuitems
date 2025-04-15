// routes/auth.js
import express from 'express';
import { login, refreshToken,registerUser } from '../controllers/authController.js';


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/refresh", refreshToken); // New route

export default router;
