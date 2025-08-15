import { CreateOrderItemDto } from "./orderItem.dto";

export interface CreateOrderDto {
    booth_id: number;
    name: string;
    email: string;
    estimated_minutes: number;
    orderItems: CreateOrderItemDto[];
}
export interface UpdateOrderDto {
    id: number;
    booth_id?: number;
    name?: string;
    email?: string;
    estimated_minutes?: number;
    status?: 'pending' | 'paid' | 'cancelled';
    orderItems?: CreateOrderItemDto[];
}
export interface ResponseOrderDto {
    id: number;
    booth_id: number;
    name: string;
    email: string;
    qrcode: string;
    status: string;
    estimated_minutes: number;
    total_price: number;
    created_at: Date;
    orderItems?: CreateOrderItemDto[];
}
 