import { Request, Response } from 'express';
import { confirmPayment } from '../services/payment.service';
import { Intent } from '../enumeration/intent.enum';
import { saveMessage } from '../services/chat.service';
import { Role } from '../enumeration/role.enum';
import { getClientByEmail } from '../socket/socketServer';
import { ChatDTO } from '../dtos/chat.dto';
import { Status } from '../enumeration/status.enum';
import { orderQueue } from '../job/queues/order.queue';
import { OrderStatus } from '../enumeration/order.enum';
import { ChatType } from '../enumeration/chatType.enum';

const progressOrderMinutes = 1

export const handlePayment = async (req: Request, res: Response) => {
  const { orderId, email } = req.params;

  try {
    const order = await confirmPayment(orderId, email);

    if (!order) {
      return res.status(404).json({
        message: '❌ Order tidak ditemukan atau email tidak cocok.'
      });
    }
    let message = '✅ Status pembayaran berhasil diperbarui.'
    if (order.status == Status.ALREADY_PAID) {
      message = '✅ Order sudah dibayar sebelumnya.'
      return res.status(200).json({
        message,
        order_id: order.id,
        status: Status.PAID
      });
    }

    // Progress JOB (gapake await karna biar barengan)
    orderQueue.add(OrderStatus.ON_PROGRESS, { orderId: order.id }, {
      delay: 1000 * 60 * progressOrderMinutes,
      removeOnComplete: true,
      removeOnFail: true,
    });

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
      socket.emit('message', { type: ChatType.CHAT_RESPONSE, payload });

      socket.emit('message', {
        type: ChatType.ORDER_STATUS_UPDATED,
        payload: {
          order: order,
        }
      });
    }

    return res.status(200).json({
      message,
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