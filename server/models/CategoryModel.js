import db from '../config/db.js';

const getCategoryByName = async (categoryName) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE category_name = ?', [categoryName]);
  return rows[0];
};

export default {
  getCategoryByName,

};
