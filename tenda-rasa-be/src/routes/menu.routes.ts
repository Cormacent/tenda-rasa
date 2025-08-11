import express from 'express';
import { getAvailableMenus, getMenuById } from '../controllers/menu.controller';

const router = express.Router();
console.log('📁 menuRoutes mounted');

router.get('/', getAvailableMenus);
router.get('/:id', getMenuById);

export default router;