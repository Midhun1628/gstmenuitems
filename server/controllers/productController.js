import {getCategoryByName,getAllCategories} from '../models/SubModels/CategoryModel.js'; // Make sure this exists
import { ProductModel } from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { product_name, description, price, stock } = req.body;

    const productId = await ProductModel.createProduct(product_name, description, price, stock);
    
    res.json({ message: "Product created successfully", productId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { name, category, price, stock } = req.body; // category is category_name

    // Find the category_id from category name
    const categoryData = await getCategoryByName(category);

    if (!categoryData) {
      return res.status(400).json({ error: "Invalid category name" });
    }

    const category_id = categoryData.category_id;

    await ProductModel.updateProduct(name, category_id, price, stock, product_id);

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    
    await ProductModel.deleteProduct(product_id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
