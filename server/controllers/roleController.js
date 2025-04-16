import { RoleModel } from "../models/roleModel.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    const existingRole = await RoleModel.findByName(role_name);
    if (existingRole) {
      return res.status(403).json({ message: "Role already exists" });
    }

    const roleId = await RoleModel.createRole(role_name);
    res.json({ message: "Role created successfully", roleId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const { role_name } = req.body;

    console.log('role id  ', typeof( role_id));
    

    const existingRole = await RoleModel.findByName(role_name);
    if (existingRole && existingRole.role_id != role_id) {
      return res.status(409).json({ message: "Role already exists" });
    }

    await RoleModel.updateRole(role_id, role_name);
    res.json({ message: "Role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteRole = async (req, res) => {
  try {
    const { role_id } = req.params;

    await RoleModel.deleteRole(role_id);
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
