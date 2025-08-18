import { Request, Response } from 'express';
import * as ChatService from '../services/chat.service';
import { Intent } from '../enumeration/intent.enum';
import { getAllOrdersByEmail } from '../services/order.service';
import { getAvailableMenus } from '../services/menu.service';
import { MenuDTO } from '../dtos/menu.dto';
import { ChatDTO } from '../dtos/chat.dto';
import { Role } from '../enumeration/role.enum';
import { Socket } from 'socket.io';
import { getClientByEmail } from '../socket/socketServer';


export const getConversation = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const history = await ChatService.getConversationByEmail(email);
    res.json(history);
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


export async function handleChatEvent(payload: ChatDTO) {
  const { email, name, message, } = payload;
  const socket = getClientByEmail(email);
  if (!socket) {
    throw Error('Missing socket')
  }
  try {
    // validate required fields
    if (!name || !message) {
      socket.emit('message', { type: 'error', message: 'Email Required.' });
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
    const sendMessageResponse = await ChatService.saveMessage(chatData);

    // Push the message USER to WebSocket clients
    socket.send({
      type: 'chat_sent', payload: sendMessageResponse
    });


    // Process the message with Gemini
    const menus = await getAvailableMenus();
    const result = await ChatService.generateChatResponse({ name, email, message: message.chat, menus });

    // Prepare saved message for WebSocket response
    const { intent, menuIds, chat } = result

    if (intent === Intent.GREETING) {
    } else if (intent === Intent.ORDER_STATUS) {
      await getAllOrdersByEmail(email).then(orders => {
        result.orders = orders;
      });
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
    const chatHistory = await ChatService.saveMessage(payload);


    // push the response to WebSocket clients
    socket.send({
      type: 'chat_response', payload: chatHistory
    });

  } catch (err) {
    console.error('Chat controller error:', err);

    socket.emit('message', {
      type: 'error',
      message: 'Gagal memproses pesan.'

    });

  }
}