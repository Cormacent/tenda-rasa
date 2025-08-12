import { FilterConfig } from "./filterConfig";

export const menuFilterConfig: FilterConfig = {
  id: { key: 'id', type: 'exact' },
  menu_name: { key: 'menu_name', type: 'like' },           // relasi (order item)
  menu_type: { key: 'menu_type', type: 'exact' },          // relasi (order item)
  description: { key: 'description', type: 'like' },
  category: { key: 'category', type: 'exact' },
  price_min: { key: 'price', type: 'gte' },
  price_max: { key: 'price', type: 'lte' },
  spiciness_min: { key: 'spiciness_level', type: 'gte' },
  spiciness_max: { key: 'spiciness_level', type: 'lte' },
  stock_min: { key: 'stock', type: 'gte' },
  stock_max: { key: 'stock', type: 'lte' },
  is_available: { key: 'is_available', type: 'exact' },
  booth_id: { key: 'booth_id', type: 'exact' },
  estimated_min: { key: 'estimated_minutes', type: 'gte' },
  estimated_max: { key: 'estimated_minutes', type: 'lte' }
};