import * as RolePermission from '../models/rolePermissionModel.js';
import { getRoleIdByName } from '../models/roleModel.js';
import { getPermissionIdByName } from '../models/permissionModel.js';

export const getAll = async (req, res) => {
  try {
    const data = await RolePermission.getAllRolePermissions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching role permissions', error: err });
  }
};

export const create = async (req, res) => {
  const { role_name, permission_name } = req.body;
  try {
    const roleId = await getRoleIdByName(role_name);
    const permissionId = await getPermissionIdByName(permission_name);

    if (!roleId || !permissionId) return res.status(400).json({ message: 'Invalid role or permission name' });

    const id = await RolePermission.createRolePermission(roleId, permissionId);
    res.status(201).json({ message: 'Role permission created', id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating role permission', error: err });
  }
};

export const update = async (req, res) => {
  const { role_name, permission_name } = req.body;
  const { id } = req.params;

  try {
    const roleId = await getRoleIdByName(role_name);
    const permissionId = await getPermissionIdByName(permission_name);

    if (!roleId || !permissionId) return res.status(400).json({ message: 'Invalid role or permission name' });

    await RolePermission.updateRolePermission(id, roleId, permissionId);
    res.json({ message: 'Role permission updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating role permission', error: err });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await RolePermission.deleteRolePermission(id);
    res.json({ message: 'Role permission deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting role permission', error: err });
  }
};


