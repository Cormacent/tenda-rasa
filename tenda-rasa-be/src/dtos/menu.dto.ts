export interface ResponseMenuDto {
  id: number;
  boothName: string;
  menuName: string;
  description: string;
  price: number;
  tags: string[];
  category: string;
  menuType: string;
  spicinessLevel: number;
  imageUrl: string;
  stock: number;
  isAvailable: boolean;
  estimatedMinutes: number;
  isFavorite: boolean;
  createdBy: string;
  updatedBy: string;
}

export interface MenuPageRequestDTO {
  limit?: number;
  offset?: number;
  sortBy?: 'price' | 'name' | 'spiciness_level' | 'stock' | 'estimated_minutes' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  filters?: ResponseMenuDto; // Filters can be applied based on the ResponseMenuDto structure
}