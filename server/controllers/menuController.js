import {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } from "../models/menuModel.js";
  
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
      const { menu_name } = req.body;
      const insertId = await createMenuItem(menu_name);
      res.status(201).json({ message: "Menu item created", menu_id: insertId });
    } catch (error) {
      res.status(500).json({ message: "Error creating menu item", error });
    }
  };
  
  export const editMenuItem = async (req, res) => {
    try {
      const { menu_id } = req.params;
      const { menu_name } = req.body;
      const affected = await updateMenuItem(menu_id, menu_name);
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
  