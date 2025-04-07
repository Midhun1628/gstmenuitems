import db from "../config/db.js";

export const getAllMenuItems = async () => {
  const [rows] = await db.query("SELECT * FROM menu_items");
  return rows;
};

export const createMenuItem = async (menu_name) => {
  const [result] = await db.query(
    "INSERT INTO menu_items (menu_name) VALUES (?)",
    [menu_name]
  );
  return result.insertId;
};

export const updateMenuItem = async (menu_id, menu_name) => {
  const [result] = await db.query(
    "UPDATE menu_items SET menu_name = ? WHERE menu_id = ?",
    [menu_name, menu_id]
  );
  return result.affectedRows;
};

export const deleteMenuItem = async (menu_id) => {
  const [result] = await db.query("DELETE FROM menu_items WHERE menu_id = ?", [
    menu_id,
  ]);
  return result.affectedRows;
};
