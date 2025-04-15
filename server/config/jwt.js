import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (user) => {
  return jwt.sign({ user_id: user.user_id,role_id:user.role_id,email:user.email }, process.env.ACCESS_SECRET, { expiresIn: "1m" });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ user_id: user.user_id,role_id:user.role_id,email:user.email }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_SECRET)
  } catch (error) {
    return null;
  }
};