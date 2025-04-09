import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";
import { PERMISSIONS } from "../constants.js"

const router = express.Router();

router.get("/users", authenticateToken, checkPermission(PERMISSIONS.VIEW_USERS), getAllUsers);
router.post("/users", authenticateToken, checkPermission(PERMISSIONS.CREATE_USERS), createUser);
router.put("/users/:user_id", authenticateToken, checkPermission(PERMISSIONS.UPDATE_USERS), updateUser);
router.delete("/users/:user_id", authenticateToken, checkPermission(PERMISSIONS.DELETE_USERS), deleteUser);

export default router;
