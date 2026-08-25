import { Request, Response } from 'express';
import { confirmPayment } from '../services/payment.service';
import { saveMessage } from '../services/chat.service';
import { getClientByEmail } from '../socket/socketServer';
import { orderQueue } from '../job/queues/order.queue';

import { Intent } from '../enumeration/intent.enum';
import { Role } from '../enumeration/role.enum';
import { Status } from '../enumeration/status.enum';
import { OrderStatus } from '../enumeration/order.enum';
import { ChatType } from '../enumeration/chatType.enum';

import { ChatDTO } from '../dtos/chat.dto';
import { ResponseOrderDto } from '../dtos/order.dto';

const progressOrderMinutes = 1;

export const handlePayment = async (req: Request, res: Response) => {
  const { orderId, email } = req.params;

  try {
    const order = await confirmPayment(orderId, email);
    if (!order) {
      return res.status(404).json({
        message: '❌ Order tidak ditemukan atau email tidak cocok.',
      });
    }

    let message = '✅ Status pembayaran berhasil diperbarui.';

    switch (order.status) {
      case Status.ALREADY_PAID:
        message = '✅ Order sudah dibayar sebelumnya.';
        await pushMessagePayment(order, message);
        break;

      case Status.CANCELLED:
        message = '❌ Order kamu dibatalkan oleh Terrabot.';
        await pushMessagePayment(order, message);
        break;

      case Status.COMPLETED:
        message = '✅ Order kamu sudah selesai, tidak ada yang perlu dibayarkan lagi.';
        await pushMessagePayment(order, message);
        break;

      case Status.PAID:
        // lanjut ke proses normal
        break;

      default:
        return res.status(200).json({
          message,
          order_id: order.id,
          status: Status.PAID,
        });
    }

    // Order sudah dibayar, batalkan job "expire" supaya tidak race dengan pembayaran ini
    await orderQueue.remove(`expire-order-${order.id}`);

    // Tambahkan job ke queue (tanpa await)
    orderQueue.add(OrderStatus.ON_PROGRESS, { orderId: order.id }, {
      delay: 1000 * 60 * progressOrderMinutes,
      removeOnComplete: true,
      removeOnFail: true,
    });

    await pushMessagePayment(order, `✅ Pembayaran untuk order ID ${order.id} berhasil diproses.`);

    return res.status(200).json({
      message,
      order_id: order.id,
      status: order.status,
    });

  } catch (error: any) {
    console.error('[Payment Error]', error);
    return res.status(500).json({
      message: '❌ Terjadi kesalahan saat memproses pembayaran.',
      error: error?.message || 'Unknown error',
    });
  }
};

const pushMessagePayment = async (order: ResponseOrderDto, message: string) => {
  const chatPayload: ChatDTO = {
    email: order.email,
    name: order.name,
    message: {
      chat: message,
      orderIds: [order.id],
    },
    role: Role.ASSISTANT,
    timestamp: new Date(),
    intent: Intent.ORDER_STATUS,
  };

  const savedMessage = await saveMessage(chatPayload);
  savedMessage.message.orders = [order];

  const socket = getClientByEmail(order.email);
  if (!socket) return;

  socket.emit('message', { type: ChatType.CHAT_RESPONSE, payload: savedMessage });
  socket.emit('message', {
    type: ChatType.ORDER_STATUS_UPDATED,
    payload: { order },
  });
};