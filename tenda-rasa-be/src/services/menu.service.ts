import { paginationParams } from '../dtos/pagination.dto';
import models from '../models';
import { buildWhereClause } from '../utils/buildWhereClause';
import { menuFilterConfig } from '../utils/menuFilterConfig';

const { MenuBooth } = models;


export const getAvailableMenus = async () => {
  return await MenuBooth.findAll({
    where: { is_available: true },
    order: [['menu_name', 'ASC']]
  });
};
export const getAvailableMenusPaginated = async ({
  limit,
  offset,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filters = {}
}: paginationParams) => {
  const dynamicFilters = buildWhereClause(filters, menuFilterConfig);

  const where = {
    isAvailable: true,
    ...dynamicFilters
  };

  const order = [[sortBy, sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']];

  return await MenuBooth.findAndCountAll({
    where,
    limit,
    offset,
    order
  });
};


export const getMenuById = async (id: number) => {
  return await MenuBooth.findByPk(id);
};