import express from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.get("/products", authenticateToken, checkPermission("view",3), getAllProducts);
router.post("/products", authenticateToken, checkPermission("create",3), createProduct);
router.put("/products/:product_id", authenticateToken, checkPermission("update",3), updateProduct);
router.delete("/products/:product_id", authenticateToken, checkPermission("delete",3), deleteProduct);

export default router;
