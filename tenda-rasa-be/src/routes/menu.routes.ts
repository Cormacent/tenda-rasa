import express from 'express';
import { getAvailableMenus, getMenuById, getMenuPage } from '../controllers/menu.controller';

const router = express.Router();

router.get('/', getAvailableMenus);
router.post('/page', getMenuPage);
router.get('/:id', getMenuById);

export default router;