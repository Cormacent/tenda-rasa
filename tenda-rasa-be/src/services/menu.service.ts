import models from '../models';

const { MenuBooth } = models;

export const getAvailableMenus = async () => {
  return await MenuBooth.findAll({
    where: { is_available: true },
    order: [['menu_name', 'ASC']]
  });
};

export const getMenuById = async (id: number) => {
  return await MenuBooth.findByPk(id);
};