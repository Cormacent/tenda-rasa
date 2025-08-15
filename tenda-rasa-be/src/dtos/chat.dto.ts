import { intentLabels } from "../enumeration/intent.enum";
import { MenuDTO } from "./menu.dto";
import { ResponseOrderDto } from "./order.dto";

export interface ChatDTO {
    id?: number;
    email: string;
    name: string;
    message: any; // JSONB
    role: string;
    timestamp: Date;
    intent?: string;
    menuIds?: number[];
}

export interface ChatMessageDTO {
    chat?: any;
    menus?: MenuDTO[];
    orders?: ResponseOrderDto[];
    intent?: string;
    menuIds?: number[];
}