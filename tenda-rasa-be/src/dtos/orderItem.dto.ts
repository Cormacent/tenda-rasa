export interface CreateOrderItemDto {
    menu_id: number;
    quantity: number;
    subtotal: number;
    price: number;
    created_at?: Date;
    updated_at?: Date;
    order_id?: number; // Optional for creation, required for updates
    menu_name?: string; // Optional, used for order items
    menu_category?: string; // Optional, used for order items
    menu_type?: string; // Optional, used for order items
    spiciness_level?: number; // Optional, used for order items
    image_url?: string; // Optional, used for order items
    estimated_minutes?: number; // Optional, used for order items
}
export interface ResponseOrderItemDto {
  id: number;
  menu_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  order_id: number;
  created_at: Date;
  updated_at: Date;
  

  // Informasi tambahan dari MenuBooth
  menu_name: string;
  menu_category?: string;
  menu_type?: string;
  spiciness_level?: number;
  image_url?: string;
  estimated_minutes?: number;
}