import { Request, Response } from 'express';
import { confirmPayment } from '../services/payment.service';
import { Intent } from '../enumeration/intent.enum';
import { saveMessage } from '../services/chat.service';
import { Role } from '../enumeration/role.enum';
import { getClientByEmail } from '../socket/socketServer';
import { ChatDTO } from '../dtos/chat.dto';

export const handlePayment = async (req: Request, res: Response) => {
  const { orderId, email } = req.params;

  try {
    const order = await confirmPayment(orderId, email);

    if (!order) {
      return res.status(404).json({
        message: '❌ Order tidak ditemukan atau email tidak cocok.'
      });
    }


    // Push receipt 
    const chatOrderPaymentCompleted: ChatDTO = {
      email: order.email,
      name: order.name,
      'message': {
        chat: `✅ Pembayaran untuk order ID ${order.id} berhasil diproses.`,
        orderIds: [order.id]
      },
      role: Role.ASSISTANT,
      timestamp: new Date(),
      intent: Intent.ORDER_STATUS
    };
    const sendMessageResponse = await saveMessage(chatOrderPaymentCompleted);
    // Push the message USER to WebSocket clients
    const payload: ChatDTO = sendMessageResponse
    payload.message.orders = [order]
    const socket = getClientByEmail(email);
    if (socket) {
      socket.emit('message', { type: 'chat_sent', payload });
    }

    return res.status(200).json({
      message: order.status === 'PAID'
        ? '✅ Order sudah dibayar sebelumnya.'
        : '✅ Status pembayaran berhasil diperbarui.',
      order_id: order.id,
      status: order.status
    });

  } catch (error: any) {
    console.error('[Payment Error]', error);

    return res.status(500).json({
      message: '❌ Terjadi kesalahan saat memproses pembayaran.',
      error: error?.message || 'Unknown error'
    });
  }
};