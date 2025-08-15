import WebSocket, { Server } from 'ws';
import { handleChatMessage } from './handlers/chatHandler';
import type { Server as HttpServer } from 'http';
import url from 'url';

let wssInstance: WebSocket.Server;

// 🧠 Track client berdasarkan email
const clientsByEmail = new Map<string, WebSocket>();

export function setupWebSocketServer(server: HttpServer) {
  const wss = new Server({ server });
  wssInstance = wss;

  wss.on('connection', (socket, req) => {
    const query = url.parse(req.url || '', true).query;
    const email = typeof query.email === 'string' ? query.email : undefined;

    if (!email) {
      console.warn('⚠️ WebSocket connection without email');
      socket.send(JSON.stringify({ type: 'error', message: 'Email is required in query params' }));
      socket.close();
      return;
    }

    // Simpan socket berdasarkan email
    clientsByEmail.set(email, socket);
    console.log(`🔌 WebSocket connected for ${email}`);

    socket.on('message', data => {
      console.log("🚀 ~ WebSocket message received:", data);
      try {
        const { type, payload } = JSON.parse(data.toString());

        switch (type) {
          case 'chat':
            handleChatMessage(socket, payload);
            break;
          default:
            socket.send(JSON.stringify({ type: 'error', message: 'Unknown event type' }));
        }
      } catch (err) {
        console.error('❌ WebSocket parse error:', err);
        socket.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
      }
    });

    socket.on('close', () => {
      clientsByEmail.delete(email);
      console.log(`❌ WebSocket disconnected for ${email}`);
    });
  });
}

// 🔍 Ambil socket berdasarkan email
export function getClientByEmail(email: string): WebSocket | undefined {
  return clientsByEmail.get(email);
}

// 🔁 Kalau kamu butuh broadcast ke semua client
export function broadcastToAllClients(message: any) {
  wssInstance.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

export function getWebSocketServer(): WebSocket.Server {
  return wssInstance;
}