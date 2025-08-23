import { FilterConfig } from "./filterConfig";

export const menuFilterConfig: FilterConfig = {
  id: { key: 'id', type: 'exact' },
  menuName: { key: 'menu_name', type: 'like' },           // relasi (order item)
  menuType: { key: 'menu_type', type: 'exact' },          // relasi (order item)
  description: { key: 'description', type: 'like' },
  category: { key: 'category', type: 'exact' },
  priceMin: { key: 'price', type: 'gte' },
  priceMax: { key: 'price', type: 'lte' },
  spicinessMin: { key: 'spiciness_level', type: 'gte' },
  spicinessMax: { key: 'spiciness_level', type: 'lte' },
  stockMin: { key: 'stock', type: 'gte' },
  stockMax: { key: 'stock', type: 'lte' },
  is_available: { key: 'is_available', type: 'exact' },
  booth_id: { key: 'booth_id', type: 'exact' },
  estimatedMin: { key: 'estimated_inutes', type: 'gte' },
  estimatedMax: { key: 'estimated_minutes', type: 'lte' }
};