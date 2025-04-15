import express from "express";
import { getAllRoles,createRole,updateRole,deleteRole} from "../controllers/roleController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";
import { PERMISSIONS } from "../constants.js"


const router = express.Router();

router.get("/roles",authenticateToken,checkPermission(PERMISSIONS.VIEW_ROLES), getAllRoles);
router.post("/roles",authenticateToken ,checkPermission(PERMISSIONS.CREATE_ROLES),createRole);
router.put("/roles/:role_id",authenticateToken,checkPermission(PERMISSIONS.UPDATE_ROLES),updateRole);
router.delete("/roles/:role_id",authenticateToken ,checkPermission(PERMISSIONS.DELETE_ROLES),deleteRole);

export default router;
