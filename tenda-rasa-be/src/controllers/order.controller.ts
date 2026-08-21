import { Request, Response } from 'express';
import * as OrderService from '../services/order.service';
import { CreateOrderDto } from '../dtos/order.dto';
import { Intent } from '../enumeration/intent.enum';
import { Role } from '../enumeration/role.enum';
import { saveMessage } from '../services/chat.service';
import { Status } from '../enumeration/status.enum';
import { getClientByEmail } from '../socket/socketServer';
import { orderQueue } from '../job/queues/order.queue';
import { ChatDTO } from '../dtos/chat.dto';
import { OrderStatus } from '../enumeration/order.enum';
import { ChatType } from '../enumeration/chatType.enum';

export const getAllActiveOrdersByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required in request body' });
  }

  try {
    const orders = await OrderService.getAllActiveOrdersByEmail(email);
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
  orderDto.estimatedMinutes = 1

  try {
    const order = await OrderService.createOrder(orderDto);

    // Progress JOB (gapake await karna biar barengan)
    orderQueue.add(OrderStatus.EXPIRED_PAYMENT, { orderId: order.id }, {
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
      socket.emit('message', { type: ChatType.CHAT_SENT, payload });
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

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid or missing order ID in URL' });
  }

  try {
    const order = await OrderService.getOrderById(Number(id));

    if (!order) {
      return res.status(404).json({ message: `Order with ID ${id} not found` });
    }

    res.json(order);
  } catch (err: Error | any) {
    console.error(`❌ Error fetching order ${id}:`, err);
    res.status(500).json({
      message: 'Error fetching order',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
};
