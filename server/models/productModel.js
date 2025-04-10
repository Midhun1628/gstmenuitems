import db from "../config/db.js";

export class ProductModel {
 static async getAllProducts() {
    const [rows] = await db.query(`
      SELECT 
        p.product_id,
        p.product_name,
        p.retail_price,
        p.stock_quantity,
        c.category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
    `);
    return rows;
  }

  static async getProductById(product_id) {
    const [rows] = await db.query("SELECT * FROM products WHERE product_id = ?", [product_id]);
    return rows[0];
  }

  static async createProduct(product_name,stock_quantity, retail_price, low_stock_level) {
    const [result] = await db.query(
      "INSERT INTO products (product_name, stock_quantity, retail_price, low_stock_level) VALUES (?, ?, ?, ?)",
      [product_name, stock_quantity, retail_price, low_stock_level]
    );
    return result.insertId;
  }

  static async updateProduct( product_name,stock_quantity , retail_price,low_stock_level ,product_id) {
    await db.query(
      "UPDATE products SET product_name = ?,stock_quantity = ? , retail_price = ?,  low_stock_level = ? WHERE product_id = ?",
      [product_name, low_stock_level, retail_price, stock_quantity, product_id]
    );
  }

  static async deleteProduct(product_id) {
    await db.query("DELETE FROM products WHERE product_id = ?", [product_id]);
  }
}
