import fs from 'fs';
import path from 'path';
import { ChatDTO, ChatMessageDTO } from '../dtos/chat.dto';
import { MenuDTO } from '../dtos/menu.dto';
import { ResponseOrderDto } from '../dtos/order.dto';
import models from '../models';
import { callGemini } from '../utils/callGemini';

const { ChatHistory, MenuBooth } = models;

// process.cwd() dipakai (bukan __dirname) supaya path tetap benar baik jalan lewat
// ts-node (dev) maupun dist/app.js (production) - keduanya start dengan cwd di root project.
const PROMPT_TEMPLATE_PATH = path.resolve(process.cwd(), 'src/prompts/terrabot.prompt.md');

// Sengaja dibaca ulang tiap request (bukan di-cache) supaya prompt bisa diedit
// langsung di file .md tanpa perlu restart server.
const loadPromptTemplate = (): string => fs.readFileSync(PROMPT_TEMPLATE_PATH, 'utf-8');

const fillTemplate = (template: string, vars: Record<string, string>): string =>
  Object.entries(vars).reduce(
    (result, [key, value]) => result.split(`{{${key}}}`).join(value),
    template
  );

export const saveMessage = async (chatData: ChatDTO): Promise<ChatDTO> => {
  return await ChatHistory.create(chatData);
};

export const getConversationByEmail = async (email: string): Promise<ChatDTO[]> => {
  const chats = await ChatHistory.findAll({
    where: { email },
    order: [['timestamp', 'ASC']]
  });
  return chats.map((chat: any) => chat.toJSON() as ChatDTO);
};

export const getConversationById = async (id: number): Promise<ChatDTO> => {
  return await ChatHistory.findByPk(id)
};

export async function generateChatResponse({ name, email, message }: ChatDTO): Promise<ChatMessageDTO> {
  const { menus = [], chat = '', orders } = message || {}

  const daftarMenu = menus.map((menu: MenuDTO) => {
    const tags = menu.tags?.join(', ') || ''
    return `- [ID:${menu.id}] ${menu.menuName} [${tags}]`
  }).join('\n')

  let daftarOrder: string = 'EMPTY'
  if (orders && orders?.length > 0) {
    daftarOrder = orders?.map((order: ResponseOrderDto) => {
      return `- [ID:${order.id}] [STATUS:${order.status}]`
    }).join('\n')
  }

  const prompt = fillTemplate(loadPromptTemplate(), {
    NAME: name,
    EMAIL: email,
    CHAT: chat,
    DAFTAR_MENU: daftarMenu,
    DAFTAR_ORDER: daftarOrder,
    HAS_ORDER: String(daftarOrder !== 'EMPTY'),
  });
  const geminiResponse = await callGemini(prompt)
  const { chat: responseChat, intent, menuIds } = parseGeminiResponse(geminiResponse)

  return {
    intent,
    chat: responseChat,
    menuIds
  }
}

function parseGeminiResponse(raw: string): ChatMessageDTO {
  const [replyPart, intentPart] = raw.split('\nINTENT:');
  const chat = replyPart.trim();
  const intentLine = intentPart?.trim().split('\n')[0] || 'OTHER';
  const menuIdLine = intentPart?.trim().split('\n')[1] || 'menuIds: []';

  const intent = intentLine.trim();
  const menuIds = JSON.parse(menuIdLine.replace('menuIds:', '').trim());

  return { chat, intent, menuIds };
}
