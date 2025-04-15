const db = require("./db");

async function getAllRolePermissions() {
  const [rows] = await db.query(`
    SELECT rp.role_permission_id, r.role_name, p.permission_name
    FROM role_permissions rp
    JOIN roles r ON rp.role_id = r.role_id
    JOIN permissions p ON rp.permission_id = p.permission_id
  `);
  return rows;
}

async function addRolePermission(roleId, permissionId) {
  const [result] = await db.query("INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)", [roleId, permissionId]);
  return result.insertId;
}

async function updateRolePermission(id, roleId, permissionId) {
  await db.query("UPDATE role_permissions SET role_id = ?, permission_id = ? WHERE role_permission_id = ?", [roleId, permissionId, id]);
}

async function deleteRolePermission(id) {
  await db.query("DELETE FROM role_permissions WHERE role_permission_id = ?", [id]);
}

module.exports = {
  getAllRolePermissions,
  addRolePermission,
  updateRolePermission,
  deleteRolePermission,
};
