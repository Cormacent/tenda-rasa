import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id?: number;
    email?: string;
    name?: string;
    qrcode?: string;
    status?: string;
    estimatedMinutes?: number;
    orderItems?: IOrderItem[];
    totalPrice: number;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}