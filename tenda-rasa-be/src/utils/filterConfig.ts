export type FilterType = 'exact' | 'like' | 'range' | 'lte' | 'gte';

export interface FilterFieldConfig {
  key: string; // field in DB
  type: FilterType;
  source?: string; // optional: field in DTO
}

export type FilterConfig = Record<string, FilterFieldConfig>;


