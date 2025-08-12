import { Request, Response } from 'express';
import * as MenuService from '../services/menu.service';
import { MenuPageRequestDTO, ResponseMenuDto } from '../dtos/menu.dto';
import { PaginatedResponseDTO, BaseResponse } from '../dtos/pagination.dto';

export const getAvailableMenus = async (_req: Request, res: Response) => {
  try {
    const menus = await MenuService.getAvailableMenus();
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

export const getMenuPage = async (
  req: Request<{}, {}, {}, MenuPageRequestDTO>,
  res: Response<BaseResponse<PaginatedResponseDTO<ResponseMenuDto>>>
) => {
  try {
    const {
      limit = 10,
      offset = 0,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      filters = {}
    } = req.body as MenuPageRequestDTO;

    const parsedLimit = Number.isFinite(limit) ? limit : 10;
    const parsedOffset = Number.isFinite(offset) ? offset : 0;
    const normalizedSortOrder = sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const { rows, count } = await MenuService.getAvailableMenusPaginated({
      limit: parsedLimit,
      offset: parsedOffset,
      sortBy,
      sortOrder: normalizedSortOrder,
      filters
    });
    console.log("🚀 ~ getMenuPage ~ rows:", rows)

    const menus: ResponseMenuDto[] = rows;
    res.json({
      success: true,
      data: {
        data: menus,
        pagination: {
          total: count,
          limit: parsedLimit,
          offset: parsedOffset,
          hasMore: parsedOffset + menus.length < count
        }
      }
    });
  } catch (err: Error | any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menus',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack
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