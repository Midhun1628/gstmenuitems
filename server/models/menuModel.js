import db from "../config/db.js";


export const getSidebarMenusByRoleId = async (role_id) => {
  const [rows] = await db.query(
    `
    SELECT m.menu_id, m.menu_name, m.component_path
    FROM menu_items m
    JOIN permissions p ON m.menu_id = p.menu_id
    JOIN role_permissions rp ON p.permission_id = rp.permission_id
    WHERE rp.role_id = ? AND p.permission_action = 'view'
    `,
    [role_id]
  );
  return rows;
};


export const getAllMenuItems = async () => {
  const [rows] = await db.query("SELECT menu_id, menu_name, component_path FROM menu_items");
  return rows;
};

export const createMenuItem = async (menu_name,component_path) => {
  const [result] = await db.query(
    "INSERT INTO menu_items (menu_name,component_path) VALUES (?,?)",
    [menu_name,component_path]
  );
  return result.insertId;
};

export const updateMenuItem = async (menu_id, menu_name,component_path) => {
  const [result] = await db.query(
    "UPDATE menu_items SET menu_name = ?,component_path=? WHERE menu_id = ?",
    [menu_name,component_path, menu_id]
  );
  return result.affectedRows;
};

export const deleteMenuItem = async (menu_id) => {
  const [result] = await db.query("DELETE FROM menu_items WHERE menu_id = ?", [
    menu_id,
  ]);
  return result.affectedRows;
};
