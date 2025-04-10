// controllers/authController.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateAccessToken, generateRefreshToken } from '../config/jwt.js';
import { UserModel } from '../models/userModel.js'; // adjust to your model logic
import bcrypt from 'bcrypt';

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,//set to true in production with HTTPS
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ accessToken ,refreshToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(user);
    return res.json({ accessToken: newAccessToken });
  });
};

export const createUser = async (req, res) => {
  try {
    const { username,email,password,first_name,last_name,role_id } = req.body;

    console.log(username,email,password,first_name,last_name,role_id);
    const userExists = await UserModel.findByEmail(email);
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await UserModel.createUser(username,email,hashedPassword,first_name,last_name,role_id);

    res.json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};