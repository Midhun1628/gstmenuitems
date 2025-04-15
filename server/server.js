import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cookieParser from 'cookie-parser';
import permissionRoutes from "./routes/permissionRoutes.js";
import rolePermissionRoutes from "./routes/rolePermissionRoutes.js";
dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow Vue.js frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed request methods
    credentials: true, // Allow cookies/auth headers
  }));
app.use(express.json());

app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/role", roleRoutes);
app.use("/menu", menuRoutes);
app.use("/permission",permissionRoutes);
app.use("/rolepermission",rolePermissionRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
