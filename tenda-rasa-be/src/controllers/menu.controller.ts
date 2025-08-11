import { Request, Response } from 'express';
import * as MenuService from '../services/menu.service';

export const getAvailableMenus = async (_req: Request, res: Response) => {
  try {
    const menus = await MenuService.getAvailableMenus();
    console.log('🧾 Available Menus:', menus);
    res.json(menus);
  } catch (err: Error | any) {
    console.error('❌ Error fetching menus:', err);
    res.status(500).json({
      message: 'Error fetching menus',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      }
    });
  }
};

export const getMenuById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const menu = await MenuService.getMenuById(Number(id));
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json(menu);
  } catch (err: Error | any) {
    console.error('❌ Error fetching menus:', err);
    res.status(500).json({
      message: 'Error fetching menus',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      }
    });
  }
};