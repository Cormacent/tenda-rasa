export interface IOrderItem {
    id?: number;
    menuId?: number;
    quantity?: number;
    price?: number;
    subtotal?: number;
    orderId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    boothName?: string;
    menuName?: string;
    menuCategory?: string;
    menuType?: string;
    spicinessLevel?: number;
    imageUrl?: string;
    estimatedMinutes?: number;
    remarks?: string; // Optional, used for order items
}