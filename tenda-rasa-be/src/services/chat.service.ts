import models from '../models';

const { ChatHistory } = models;

export const saveMessage = async (chatData: any) => {
  return await ChatHistory.create(chatData);
};

export const getConversationByEmail = async (email: string) => {
  return await ChatHistory.findAll({
    where: { email },
    order: [['timestamp', 'ASC']]
  });
};