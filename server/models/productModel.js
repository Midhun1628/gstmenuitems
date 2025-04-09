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

  static async createProduct(product_name, low_stock_level, price, stock) {
    const [result] = await db.query(
      "INSERT INTO products (product_name, low_stock_level, retail_price, stock_quantity) VALUES (?, ?, ?, ?)",
      [product_name, low_stock_level, price, stock]
    );
    return result.insertId;
  }

  static async updateProduct( product_name, low_stock_level, price, stock,product_id) {
    await db.query(
      "UPDATE products SET product_name = ?, low_stock_level = ?, retail_price = ?, stock_quantity = ? WHERE product_id = ?",
      [product_name, low_stock_level, price, stock, product_id]
    );
  }

  static async deleteProduct(product_id) {
    await db.query("DELETE FROM products WHERE product_id = ?", [product_id]);
  }
}
