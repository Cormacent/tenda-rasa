import { Op } from 'sequelize';
import { FilterConfig } from './filterConfig';

export const buildWhereClause = (
  filters: Record<string, any>,
  config: FilterConfig
): Record<string, any> => {
  const where: Record<string, any> = {};

  for (const [filterKey, value] of Object.entries(filters)) {
    if (value === undefined || value === null) continue;

    const fieldConfig = config[filterKey];
    if (!fieldConfig) continue;

    const dbKey = fieldConfig.key;
    const type = fieldConfig.type;

    switch (type) {
      case 'exact':
        where[dbKey] = value;
        break;
      case 'like':
        where[dbKey] = { [Op.iLike]: `%${value}%` };
        break;
      case 'gte':
        where[dbKey] = { ...(where[dbKey] || {}), [Op.gte]: value };
        break;
      case 'lte':
        where[dbKey] = { ...(where[dbKey] || {}), [Op.lte]: value };
        break;
      case 'range':
        if (value.min !== undefined) {
          where[dbKey] = { ...(where[dbKey] || {}), [Op.gte]: value.min };
        }
        if (value.max !== undefined) {
          where[dbKey] = { ...(where[dbKey] || {}), [Op.lte]: value.max };
        }
        break;
    }
  }

  return where;
};