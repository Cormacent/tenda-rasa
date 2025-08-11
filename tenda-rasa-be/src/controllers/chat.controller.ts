import { Request, Response } from 'express';
import * as ChatService from '../services/chat.service';

export const saveMessage = async (req: Request, res: Response) => {
  const chatData = req.body;
  try {
    const result = await ChatService.saveMessage(chatData);
    res.status(201).json(result);
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