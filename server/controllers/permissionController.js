// controllers/permissionController.js
import { getAllPermissionModel, createPermissionModel, updatePermissionModel, deletePermissionModel,getMenuIdByName } from '../models/PermissionModel.js';
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
  try{

    const { menu_name, permission_action } = req.body;
    const menu_id = await getMenuIdByName(menu_name);
    if (!menu_id) return res.status(400).json({ message: 'Invalid menu_name' });
    
    const newId = await createPermissionModel({ menu_id, permission_action });
    res.status(201).json({ permission_id: newId });
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
};

export const updatePermission = async (req,  res) => {
  try{

    const { menu_name, permission_action } = req.body;
    const  id  = req.params.permission_id;
    const menu_id = await getMenuIdByName(menu_name);
    if (!menu_id) return res.status(400).json({ message: 'Invalid menu_name' });
    
    await updatePermissionModel(id, { menu_id, permission_action });
    res.json({ message: 'Permission updated' });
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
};

export const deletePermission = async (req, res) => {
try{

  const id=req.params.permission_id
  console.log('Deleting permission ID:', id);
  await deletePermissionModel(id);
  res.json({ message: 'Permission deleted' });
}
catch(error){
  res.status(500).json({ error: error.message });
}
};
