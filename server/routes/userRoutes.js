import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.get("/users", authenticateToken, checkPermission("view",2), getAllUsers);
router.post("/users", authenticateToken, checkPermission("create",2), createUser);
router.put("/users/:user_id", authenticateToken, checkPermission("update",2), updateUser);
router.delete("/users/:user_id", authenticateToken, checkPermission("delete",2), deleteUser);

export default router;
