// controllers/permissionController.js
import {isPermissionExists, getAllPermissionModel, createPermissionModel, updatePermissionModel, deletePermissionModel,getMenuIdByName } from '../models/permissionModel.js';
import * as Menu from '../models/menuModel.js'; // new

export const getPermissions = async (req, res) => {
  try{

    const permissions = await getAllPermissionModel();
    res.json(permissions);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
};

export const createPermission = async (req, res) => {
  try {
    const { menu_name, permission_action } = req.body;
    const menu_id = await getMenuIdByName(menu_name);
    if (!menu_id) return res.status(409).json({ message: 'Invalid menu_name' });

    const exists = await isPermissionExists(menu_id, permission_action);
    if (exists) return res.status(409).json({ message: 'Permission already exists for this menu and action' });

    const newId = await createPermissionModel({ menu_id, permission_action });
    res.status(201).json({ message: 'Permission created successfully', permission_id: newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const { menu_name, permission_action } = req.body;
    const id = req.params.permission_id;
    const menu_id = await getMenuIdByName(menu_name);
    if (!menu_id) return res.status(400).json({ message: 'Invalid menu_name' });

    const exists = await isPermissionExists(menu_id, permission_action);
    if (exists) {
      const [current] = await db.query(`SELECT * FROM permissions WHERE permission_id = ?`, [id]);
      if (current.length && current[0].menu_id === menu_id && current[0].permission_action === permission_action) {
        // allow update
      } else {
        return res.status(400).json({ message: 'Permission already exists for this menu and action' });
      }
    }

    await updatePermissionModel(id, { menu_id, permission_action });
    res.json({ message: 'Permission updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const id = req.params.permission_id;
    await deletePermissionModel(id);
    res.json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
