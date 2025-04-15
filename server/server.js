import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import rolePermissionRoutes from './routes/rolePermission.js'

import categoryRoutes from './routes/SubRoutes/categoryRoutes.js';

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
app.use("/rolePermission",rolePermissionRoutes)

app.use('/category', categoryRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
