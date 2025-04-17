import express from 'express';
import {
  getPermissions,
  createPermission,
  // updatePermission,
  deletePermission,
} from '../controllers/permissionController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";
import { PERMISSIONS } from "../constants.js"
import { checkPermission } from "../middleware/permissionMiddleware.js";



const router = express.Router();

router.get('/permissions', authenticateToken,checkPermission(PERMISSIONS.VIEW_PERMISSIONS), getPermissions);
router.post('/permissions', authenticateToken,checkPermission(PERMISSIONS.CREATE_PERMISSIONS), createPermission);
// router.put('/:permission_id', authenticateToken,checkPermission(PERMISSIONS.UPDATE_PERMISSIONS), updatePermission);
router.delete('/:permission_id', authenticateToken,checkPermission(PERMISSIONS.DELETE_PERMISSIONS), deletePermission);

export default router;
