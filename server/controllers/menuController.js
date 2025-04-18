import {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } from "../models/menuModel.js";
  

  import { getSidebarMenusByRoleId } from "../models/menuModel.js";

export const getSidebarMenus = async (req, res) => {
  try {
    const user = req.user; // You already extract this in authMiddleware
    const sidebarMenus = await getSidebarMenusByRoleId(user.role_id);
    res.json(sidebarMenus);
  } catch (error) {
    res.status(500).json({ message: "Failed to load sidebar menus", error });
  }
};
  export const getMenuItems = async (req, res) => {
    try {
      const menus = await getAllMenuItems();
      res.json(menus);
    } catch (error) {
      res.status(500).json({ message: "Error fetching menu items", error });
    }
  };
  
  export const addMenuItem = async (req, res) => {
    try {
      const { menu_name,component_path } = req.body;
      const insertId = await createMenuItem(menu_name,component_path);
      res.status(201).json({ message: "Menu item created", menu_id: insertId });
    } catch (error) {
      res.status(500).json({ message: "Error creating menu item", error });
    }
  };
  
  export const editMenuItem = async (req, res) => {
    try {
      const { menu_id } = req.params;
      const { menu_name,component_path } = req.body;
      const affected = await updateMenuItem(menu_id, menu_name,component_path);
      if (affected) {
        res.json({ message: "Menu item updated" });
      } else {
        res.status(404).json({ message: "Menu item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating menu item", error });
    }
  };
  
  export const removeMenuItem = async (req, res) => {
    try {
      const { menu_id } = req.params;
      const affected = await deleteMenuItem(menu_id);
      if (affected) {
        res.json({ message: "Menu item deleted" });
      } else {
        res.status(404).json({ message: "Menu item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting menu item", error });
    }
  };
  