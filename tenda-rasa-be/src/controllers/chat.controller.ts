import { Request, Response } from 'express';
import * as ChatService from '../services/chat.service';
import { Intent } from '../enumeration/intent.enum';
import { getAllOrdersByEmail, getOrderByIds, getActiveOrdersByEmail } from '../services/order.service';
import { getAvailableMenus } from '../services/menu.service';
import { MenuDTO } from '../dtos/menu.dto';
import { ChatDTO } from '../dtos/chat.dto';
import { Role } from '../enumeration/role.enum';
import { getClientByEmail } from '../socket/socketServer';
import { ChatType } from '../enumeration/chatType.enum';
export const getConversation = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const histories = await ChatService.getConversationByEmail(email);
    const allOrders = await getAllOrdersByEmail(email);
    const allMenus = await getAvailableMenus();

    for (const history of histories) {
      const { message } = history;
      if (!message) continue;
      const { orderIds = [], menuIds = [] } = message;

      if (orderIds.length > 0) {
        message.orders = allOrders.filter((order: any) => orderIds.includes(order.id));
      }

      if (menuIds.length > 0) {
        message.menus = allMenus.filter((menu: MenuDTO) => menuIds.includes(menu.id));
      }
    }

    res.json(histories);
  } catch (err: Error | any) {
    console.error('❌ Error fetching conversation:', err);
    res.status(500).json({
      message: 'Error fetching conversation',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      }
    });
  }
}
export const getConversationById = async (req: Request, res: Response) => {
  const { id, email } = req.body

  try {
    const [allOrders, allMenus, history] = await Promise.all([
      getAllOrdersByEmail(email),
      getAvailableMenus(),
      ChatService.getConversationById(id)
    ])

    if (!history || !history.message) {
      return res.status(404).json({ message: 'Conversation not found or has no message.' })
    }

    const { message } = history
    const { orderIds = [], menuIds = [] } = message

    if (Array.isArray(orderIds) && orderIds.length > 0) {
      message.orders = allOrders.filter(order => orderIds.includes(order.id))
    }

    if (Array.isArray(menuIds) && menuIds.length > 0) {
      message.menus = allMenus.filter((menu: MenuDTO) => menuIds.includes(menu.id))
    }

    res.json(history)
  } catch (err: Error | any) {
    console.error('❌ Error fetching conversation:', err)
    res.status(500).json({
      message: 'Error fetching conversation',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      }
    })
  }
}


export async function handleChatEvent(payload: ChatDTO) {
  const { email, name, message, } = payload;
  const socket = getClientByEmail(email);
  if (!socket) {
    throw Error('Missing socket')
  }
  try {
    // validate required fields
    if (!name || !message) {
      socket.emit('message', { type: ChatType.ERROR, message: 'Email Required.' });
      return;
    }

    // Save the incoming chat message
    const chatData = {
      email,
      name,
      message: message,
      role: Role.USER,
      timestamp: new Date(),
      intent: Intent.USER // Will be set after processing
    };
    const sendMessageResponse = await ChatService.saveMessage(chatData)

    // Push the message USER to WebSocket clients
    socket.send({
      type: ChatType.CHAT_SENT, payload: sendMessageResponse
    });


    // Process the message with Gemini
    const menus = await getAvailableMenus();
    const orders = await getActiveOrdersByEmail(email)
    sendMessageResponse.message.menus = menus
    sendMessageResponse.message.orders = orders
    const result = await ChatService.generateChatResponse(sendMessageResponse);

    // Prepare saved message for WebSocket response
    const { intent, menuIds, chat } = result

    if (intent === Intent.GREETING) {
    } else if (intent === Intent.ORDER_STATUS) {
      result.orders = orders
    }
    else if (intent === Intent.RECOMMENDATION && menuIds && menuIds.length > 0) {
      result.menus = menus.filter((menu: MenuDTO) => menuIds?.includes(menu.id));
    }

    const payload: ChatDTO = {
      email,
      name,
      message: {
        chat,
        menus: result.menus || [],
        orders: result.orders || [],
      },
      role: Role.ASSISTANT,
      timestamp: new Date(),
      intent: intent || Intent.OTHER
    };
    const chatResponse = await ChatService.saveMessage(payload);

    const payloadMesageResponse: ChatDTO = sendMessageResponse
    if (
      payloadMesageResponse.intent === Intent.ORDER_STATUS &&
      payloadMesageResponse.message &&
      Array.isArray(payloadMesageResponse.message.orderIds) &&
      payloadMesageResponse.message.orderIds.length > 0
    ) {
      payloadMesageResponse.message.orders = await getOrderByIds(payloadMesageResponse.message.orderIds)
    }

    // push the response to WebSocket clients
    socket.send({
      type: ChatType.CHAT_RESPONSE, payload: chatResponse
    });

  } catch (err) {
    console.error('Chat controller error:', err);

    socket.emit('message', {
      type: ChatType.ERROR,
      message: 'Gagal memproses pesan.'

    });

  }
}