// models/permissionModel.js
import db from '../config/db.js';

export const getAllPermissionModel = async () => {
  const [rows] = await db.query(`
    SELECT p.permission_id, p.permission_action, p.permission_name, 
           m.menu_name
    FROM permissions p
    JOIN menu_items m ON p.menu_id = m.menu_id
  `);
  return rows;
};

export const getMenuIdByName = async (menu_name) => {
  const [rows] = await db.query(`SELECT menu_id FROM menu_items WHERE menu_name = ?`, [menu_name]);
  return rows[0]?.menu_id || null;
};

export const createPermissionModel = async ({ menu_id, permission_action }) => {
  const [result] = await db.query(
    `INSERT INTO permissions (menu_id, permission_action) VALUES (?, ?)`,
    [menu_id, permission_action]
  );
  return result.insertId;
};

export const updatePermissionModel = async (id, { menu_id, permission_action }) => {
  await db.query(
    `UPDATE permissions SET menu_id = ?, permission_action = ? WHERE permission_id = ?`,
    [menu_id, permission_action, id]
  );
};

export const deletePermissionModel= async (id) => {
  await db.query(`DELETE FROM permissions WHERE permission_id = ?`, [id]);
};



//using in role_permission management

export const getPermissionIdByName = async (permissionName) => {
  const [rows] = await db.query('SELECT permission_id FROM permissions WHERE permission_name = ?', [permissionName]);
  return rows[0]?.permission_id;  
}