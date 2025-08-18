import { Request, Response } from 'express';
import * as OrderService from '../services/order.service';
import { CreateOrderDto } from '../dtos/order.dto';
import { Intent } from '../enumeration/intent.enum';
import { Role } from '../enumeration/role.enum';
import { saveMessage } from '../services/chat.service';
import { Status } from '../enumeration/status.enum';
import { getClientByEmail } from '../socket/socketServer';
import { orderQueue } from '../job/queues/orderQueue';
import { ChatDTO } from '../dtos/chat.dto';

export const getAllOrdersByEmail = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required in request body' });
  }

  try {
    const orders = await OrderService.getAllOrdersByEmail(email);
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this email' });
    }

    res.json(orders);
  } catch (err: Error | any) {
    console.error('❌ Error fetching menus:', err);
    res.status(500).json({
      message: 'Error fetching menus',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      }
    });
  }
};
export const createOrder = async (req: Request, res: Response) => {
  const orderDto: CreateOrderDto = req.body;
  orderDto.status = Status.PENDING;
  orderDto.estimatedMinutes = 2

  try {
    const order = await OrderService.createOrder(orderDto);

    // REDIS JOB
    await orderQueue.add('expire-order', { orderId: order.id }, {
      delay: 1000 * 60 * orderDto.estimatedMinutes,
      removeOnComplete: true,
      removeOnFail: true,
    });


    const chatData: ChatDTO = {
      email: orderDto.email,
      name: orderDto.name,
      'message': {
        chat: 'Lanjutkan pembayaran agar order kamu bisa di proses.',
        orders: [order],
        orderIds: [order.id]
      },
      role: Role.ASSISTANT,
      timestamp: new Date(),
      intent: Intent.ORDER_PAYMENT // Will be set after processing

    };
    const sendMessageResponse = await saveMessage(chatData);

    // Push the message USER to WebSocket clients
    const payload: ChatDTO = sendMessageResponse
    payload.message.orders = [order]
    const socket = getClientByEmail(orderDto.email);
    if (socket) {
      socket.emit('message', { type: 'chat_sent', payload });
    }

    res.status(201).json(order);
  } catch (err: any) {
    console.error("❌ Error creating order:", err);

    res.status(500).json({
      message: "Error creating order",
      error: err?.message || JSON.stringify(err) || "Unknown error"
    });
  }
};