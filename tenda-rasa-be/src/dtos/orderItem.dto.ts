export interface CreateOrderItemDto {
  menuId: number;
  quantity: number;
  subtotal: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  orderId?: number; // Optional for creation, required for updates
  menuName?: string; // Optional, used for order items
  boothName: string;
  menuCategory?: string; // Optional, used for order items
  menuType?: string; // Optional, used for order items
  spicinessLevel?: number; // Optional, used for order items
  imageUrl?: string; // Optional, used for order items
  estimatedMinutes?: number; // Optional, used for order items
  remarks?: string; // Optional, used for order items
}
export interface ResponseOrderItemDto {
  id: number;
  menuId: number;
  quantity: number;
  price: number;
  subtotal: number;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;

  // Informasi tambahan dari MenuBooth
  boothName: string;
  menuName: string;
  menuCategory?: string;
  menuType?: string;
  spicinessLevel?: number;
  imageUrl?: string;
  estimatedMinutes?: number;
  remarks?: string; // Optional, used for order items
}