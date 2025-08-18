// handlers/chatHandler.ts
import type { Socket } from 'socket.io';
import { handleChatEvent } from '../../controllers/chat.controller';

export async function handleChatMessage(payload: any) {
    await handleChatEvent(payload);
}