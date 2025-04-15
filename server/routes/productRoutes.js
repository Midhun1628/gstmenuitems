import express from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";
import { PERMISSIONS } from "../constants.js"

const router = express.Router();

router.get("/products", authenticateToken, checkPermission(PERMISSIONS.VIEW_PRODUCTS), getAllProducts);
router.post("/products", authenticateToken, checkPermission(PERMISSIONS.CREATE_PRODUCTS), createProduct);
router.put("/products/:product_id", authenticateToken, checkPermission(PERMISSIONS.UPDATE_PRODUCTS), updateProduct);
router.delete("/products/:product_id", authenticateToken, checkPermission(PERMISSIONS.DELETE_PRODUCTS), deleteProduct);

export default router;
