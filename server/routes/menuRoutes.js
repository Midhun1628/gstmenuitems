import express from "express";
import {
  getMenuItems,
  addMenuItem,
  editMenuItem,
  removeMenuItem,
} from "../controllers/menuController.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router = express.Router();

//add the checkpermission middleware to the all menu routes

router.get("/menus",authenticateToken, getMenuItems);
router.post("/menus",authenticateToken, addMenuItem);
router.put("/menus/:menu_id",authenticateToken, editMenuItem);
router.delete("/menus/:menu_id", authenticateToken, removeMenuItem);

export default router;
