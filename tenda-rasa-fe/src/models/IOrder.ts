import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id?: number;
    booth_id: number;
    name: string;
    email: string;
    estimated_minutes: number;
    orderItems: IOrderItem[];
}