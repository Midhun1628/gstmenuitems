import {getCategoryByName,getAllCategories} from '../../models/SubModels/CategoryModel.js';



export const getAllCategory = async (req, res) => {
  try {
    const categories = await getAllCategories(); // Assume this returns category_id & category_name
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryByNameModel = async (req, res) => {
  try {
    const { category_name } = req.params;
    const category = await getCategoryByName(category_name);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}