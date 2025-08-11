export interface IMenu {
    id: number;
    booth_name: string;
    menu_name: string;
    description: string;
    price: number;
    tags: string[];
    category: string;
    menu_type: string;
    spiciness_level: number;
    image_url: string;
    stock: number;
    is_available: boolean;
    estimated_minutes: number;
    is_favorite: boolean;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
}