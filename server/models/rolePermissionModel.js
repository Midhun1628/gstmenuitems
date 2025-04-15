import db from "../config/db.js";

export const getAllRolePermissions = async () => {
  const [rows] = await db.query(`
    SELECT 
      rp.role_permission_id, 
      r.role_name, 
      p.permission_name 
    FROM role_permissions rp
    JOIN roles r ON rp.role_id = r.role_id
    JOIN permissions p ON rp.permission_id = p.permission_id
  `);
  return rows;
};

export const createRolePermission = async (roleId, permissionId) => {
  const [result] = await db.query(
    'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
    [roleId, permissionId]
  );
  return result.insertId;
};

export const updateRolePermission = async (id, roleId, permissionId) => {
  await db.query(
    'UPDATE role_permissions SET role_id = ?, permission_id = ? WHERE role_permission_id = ?',
    [roleId, permissionId, id]
  );
};

export const deleteRolePermission = async (id) => {
  await db.query('DELETE FROM role_permissions WHERE role_permission_id = ?', [id]);
};
