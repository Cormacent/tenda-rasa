import { Request, Response } from 'express';
import { getClientByEmail } from '../socket/socketServer';
import { ChatType } from '../enumeration/chatType.enum';

const PUSHABLE_TYPES = [ChatType.CHAT_SENT, ChatType.CHAT_RESPONSE, ChatType.ORDER_STATUS_UPDATED];

// Dipanggil dari luar backend (misal workflow n8n) untuk push pesan ke socket
// client yang sedang connect, tanpa n8n perlu tahu detail implementasi Socket.IO.
export const pushSocketMessage = async (req: Request, res: Response) => {
  const { email, type, payload } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'email wajib diisi' });
  }
  if (!PUSHABLE_TYPES.includes(type)) {
    return res.status(400).json({ message: `type tidak valid, harus salah satu dari: ${PUSHABLE_TYPES.join(', ')}` });
  }
  if (!payload) {
    return res.status(400).json({ message: 'payload wajib diisi' });
  }

  const socket = getClientByEmail(email);
  if (!socket) {
    return res.status(200).json({ delivered: false, message: 'User tidak sedang online, pesan tidak dikirim realtime' });
  }

  socket.emit('message', { type, payload });
  return res.status(200).json({ delivered: true });
};
