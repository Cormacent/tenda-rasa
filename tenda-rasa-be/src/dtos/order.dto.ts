import { Status } from "../enumeration/status.enum";
import { CreateOrderItemDto } from "./orderItem.dto";

export interface CreateOrderDto {
    boothId: number;
    name: string;
    email: string;
    qrcode: string;
    status: Status;
    estimatedMinutes: number;
    totalPrice: number;
    createdAt: Date;
    orderItems?: CreateOrderItemDto[];
}
export interface UpdateOrderDto {
    id: number;
    boothId?: number;
    name?: string;
    email?: string;
    estimatedMinutes?: number;
    status?: Status
    orderItems?: CreateOrderItemDto[];
}
export interface ResponseOrderDto {
    id: number;
    boothId: number;
    name: string;
    email: string;
    qrcode: string;
    status: Status;
    estimatedMinutes: number;
    totalPrice: number;
    createdAt: Date;
    orderItems?: CreateOrderItemDto[];
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}
