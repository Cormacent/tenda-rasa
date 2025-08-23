// utils/normalizeSequelizeData.ts

type PlainObject = Record<string, any>;

export function normalizeSequelizeData<T extends PlainObject>(data: T): T {
  const cleaned: PlainObject = {};

  for (const [key, value] of Object.entries(data)) {
    // Skip snake_case fields
    if (key.includes('_')) continue;

    if (value instanceof Date) {
      cleaned[key] = value.toISOString(); // ✅ Serialize Date
    } else if (Array.isArray(value)) {
      cleaned[key] = value.map(item =>
        typeof item === 'object' && item !== null
          ? normalizeSequelizeData(item)
          : item
      );
    } else if (typeof value === 'object' && value !== null) {
      cleaned[key] = normalizeSequelizeData(value);
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned as T;
}