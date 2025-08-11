export interface ResponseMenuDto {
  id: number;
    name: string;
    description?: string;
    price: number;
    category: string;
    type?: string;
    spiciness_level?: number;
    image_url?: string;
    stock: number;
    is_available: boolean;
    booth_id: number;
    estimated_minutes?: number;
    menu_name?: string; // Optional, used for order items
    menu_category?: string; // Optional, used for order items
    menu_type?: string; // Optional, used for order items
}