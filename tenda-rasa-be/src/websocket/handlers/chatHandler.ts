import WebSocket from 'ws';
import { handleChatEvent } from '../../controllers/chat.controller';
export async function handleChatMessage(socket: WebSocket, payload: any) {
    await handleChatEvent(socket, payload);
}