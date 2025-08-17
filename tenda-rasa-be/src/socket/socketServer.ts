// socketServer.ts
import { Server as SocketIOServer, Socket } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { handleChatMessage } from './handlers/chatHandlers';

let ioInstance: SocketIOServer;

// 🧠 Track client berdasarkan email
const clientsByEmail = new Map<string, Socket>();

export function setupSocketIO(server: HttpServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Atur sesuai kebutuhan
    },
    transports: ['websocket'], // Optional: force WebSocket only
  });

  ioInstance = io;

  io.on('connection', (socket) => {
    const email = typeof socket.handshake.query.email === 'string' ? socket.handshake.query.email : undefined;
    console.log("🔍 Query Params:", socket.handshake.query);
    if (!email) {
      console.warn('⚠️ Socket.IO connection without email');
      socket.emit('error', { message: 'Email is required in query params' });
      socket.disconnect();
      return;
    }

    clientsByEmail.set(email, socket);
    console.log(`🔌 Socket.IO connected for ${email}`);

    socket.on('chat', (payload) => {
      try {
        handleChatMessage(socket, payload);
      } catch (err) {
        console.error('❌ Chat handler error:', err);
        socket.emit('error', { message: 'Internal server error' });
      }
    });

    socket.on('disconnect', () => {
      clientsByEmail.delete(email);
      console.log(`❌ Socket.IO disconnected for ${email}`);
    });
  });
}

// 🔍 Ambil socket berdasarkan email
export function getClientByEmail(email: string): Socket | undefined {
  return clientsByEmail.get(email);
}

// 🔁 Broadcast ke semua client
export function broadcastToAllClients(message: any) {
  ioInstance.sockets.sockets.forEach(socket => {
    socket.emit('message', message);
  });
}

export function getSocketIO(): SocketIOServer {
  return ioInstance;
}