export interface IOrderItem {
    id: number;
    menu_id: number;
    quantity: number;
    price: number;
    subtotal: number;
    order_id: number;
    created_at: Date;
    updated_at: Date;
    menu_name: string;
    menu_category?: string;
    menu_type?: string;
    spiciness_level?: number;
    image_url?: string;
    estimated_minutes?: number;
}