import { intentLabels } from "../enumeration/intent.enum";
import { MenuDTO } from "./menu.dto";
import { ResponseOrderDto } from "./order.dto";
import { CreateOrderItemDto } from "./orderItem.dto";

export interface ChatDTO {
    id?: number;
    email: string;
    name: string;
    message: ChatMessageDTO; // JSONB
    role: string;
    timestamp: Date;
    intent?: string;
}

export interface ChatMessageDTO {
    chat?: any;
    menus?: MenuDTO[];
    orders?: ResponseOrderDto[];
    intent?: string;
    menuIds?: number[];
    orderIds?: number[];
    cart?: CreateOrderItemDto[];
    totalPrice?: number;
}