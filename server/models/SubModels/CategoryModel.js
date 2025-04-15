import db from '../../config/db.js';

export const getCategoryByName = async (categoryName) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE category_name = ?', [categoryName]);
  return rows[0];
};


export const getAllCategories = async () => {
  const [rows] = await db.query("SELECT category_id, category_name FROM categories");
  return rows;
};
