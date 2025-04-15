import express from 'express';
const router = express.Router();
import {getAll,create,update,remove } from "../controllers/rolePermissionController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";
import { PERMISSIONS } from "../constants.js"

router.get("/rolepermssions",authenticateToken,checkPermission(PERMISSIONS.VIEW_ROLE_PERMISSIONS), getAll);
router.post("/rolepermissions",authenticateToken,checkPermission(PERMISSIONS.CREATE_ROLE_PERMISSIONS), create);
router.put("/rolepermissions:id",authenticateToken,checkPermission(PERMISSIONS.UPDATE_ROLE_PERMISSIONS), update);
router.delete("/rolepermissions:id",authenticateToken,checkPermission(PERMISSIONS.DELETE_ROLE_PERMISSIONS), remove);

export default router;
