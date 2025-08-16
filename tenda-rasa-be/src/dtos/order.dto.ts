import { CreateOrderItemDto } from "./orderItem.dto";

export interface CreateOrderDto {
    boothId: number;
    name: string;
    email: string;
    estimatedMinutes: number;
    orderItems: CreateOrderItemDto[];
}
export interface UpdateOrderDto {
    id: number;
    boothId?: number;
    name?: string;
    email?: string;
    estimatedMinutes?: number;
    status?: 'pending' | 'paid' | 'cancelled';
    orderItems?: CreateOrderItemDto[];
}
export interface ResponseOrderDto {
    id: number;
    boothId: number;
    name: string;
    email: string;
    qrcode: string;
    status: string;
    estimatedMinutes: number;
    totalPrice: number;
    createdAt: Date;
    orderItems?: CreateOrderItemDto[];
}
 