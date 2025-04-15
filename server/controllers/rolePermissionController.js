import RoleModel from "../models/roleModel.js";
import permissionModel from "../models/permissionModel.js";
import rolePermissionModel from "../models/rolePermissionModel.js";

export const getAll = async (req, res) => {
  const data = await rolePermissionModel.getAllRolePermissions();
  res.json(data);
};

export const create = async (req, res) => {
  const { role_name, permission_name } = req.body;
  const roleId = await RoleModel.getRoleIdByName(role_name);
  const permissionId = await permissionModel.getPermissionIdByName(permission_name);
  if (!roleId || !permissionId) return res.status(400).json({ error: "Invalid role or permission" });

  const insertId = await rolePermissionModel.addRolePermission(roleId, permissionId);
  res.json({ insertId });
};

export const update = async (req, res) => {
  const { role_name, permission_name } = req.body;
  const { id } = req.params;
  const roleId = await RoleModel.getRoleIdByName(role_name);
  const permissionId = await permissionModel.getPermissionIdByName(permission_name);
  if (!roleId || !permissionId) return res.status(400).json({ error: "Invalid role or permission" });

  await rolePermissionModel.updateRolePermission(id, roleId, permissionId);
  res.sendStatus(204);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  await rolePermissionModel.deleteRolePermission(id);
  res.sendStatus(204);
};
