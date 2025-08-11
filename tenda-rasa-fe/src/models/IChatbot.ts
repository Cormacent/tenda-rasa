import { IMenu } from "./IMenu";

export interface IChatbot {
    id: string;
    email: string;
    name: string;
    message: IMessage;
    role: 'user' | 'assistant';
    timestamp: Date;
}
export interface IMessage {
    reply: string;
    prompt: string;
    menu: IMenu[];
}