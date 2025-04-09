import express from "express";
import {
  getMenuItems,
  addMenuItem,
  editMenuItem,
  removeMenuItem,
} from "../controllers/menuController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";
import { PERMISSIONS } from "../constants.js"


const router = express.Router();

//add the checkpermission middleware to the all menu routes

router.get("/menus",authenticateToken,checkPermission(PERMISSIONS.VIEW_MENU_ITEMS), getMenuItems);
router.post("/menus",authenticateToken,checkPermission(PERMISSIONS.CREATE_MENU_ITEMS), addMenuItem);
router.put("/menus/:menu_id",authenticateToken,checkPermission(PERMISSIONS.UPDATE_MENU_ITEMS), editMenuItem);
router.delete("/menus/:menu_id", authenticateToken,checkPermission(PERMISSIONS.DELETE_MENU_ITEMS), removeMenuItem);

export default router;
