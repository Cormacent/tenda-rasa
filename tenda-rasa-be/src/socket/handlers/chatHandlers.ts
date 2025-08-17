// handlers/chatHandler.ts
import type { Socket } from 'socket.io';
import { handleChatEvent } from '../../controllers/chat.controller';

export async function handleChatMessage(socket: Socket, payload: any) {
    await handleChatEvent(socket, payload);
}