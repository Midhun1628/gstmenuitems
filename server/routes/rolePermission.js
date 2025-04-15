import express from 'express';
import * as controller from '../controllers/rolePermissionController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";
import { PERMISSIONS } from "../constants.js"

const router = express.Router();

router.get('/rolePermissions',authenticateToken,checkPermission(PERMISSIONS.View_RolePermission), controller.getAll);
router.post('/rolePermissions',authenticateToken,checkPermission(PERMISSIONS.Create_RolePermission), controller.create);
router.put('/rolePermissions/:rolePermission_id',checkPermission(PERMISSIONS.Update_RolePermission), controller.update);
router.delete('/rolePermissions/:rolePermissions_id',checkPermission(PERMISSIONS.Delete_RolePermission), controller.remove);

export default router;
