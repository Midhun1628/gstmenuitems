import express from 'express';
import { getAllCategory } from '../../controllers/SubControllers/categoryController.js';

const router = express.Router();

router.get('/categories', getAllCategory);

export default router;
