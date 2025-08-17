import { IMenu } from "./IMenu";
import { IOrder } from "./IOrder";

export interface IMessage {
    chat?: any;
    menus?: IMenu[];
    orders?: IOrder[];
    intent?: string;
    menuIds?: number[];
}

export interface IChatbot {
    id?: number
    email?: string
    name?: string
    message?: IMessage
    role?: 'user' | 'system' | 'assistant' // bisa disesuaikan dengan enum role yang kamu pakai
    timestamp?: string // ISO date string
    intent?: string // bisa dijadikan enum kalau ada daftar intent
    createdAt?: string
    updatedAt?: string
}