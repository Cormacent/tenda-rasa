import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id?: number;
    email?: string;
    qrcode?: string;
    status?: string;
    estimatedMinutes?: number;
    orderItems: IOrderItem[];
    totalPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}