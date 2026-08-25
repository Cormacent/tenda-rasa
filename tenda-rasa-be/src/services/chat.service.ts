import fs from 'fs';
import path from 'path';
import { ChatDTO, ChatMessageDTO } from '../dtos/chat.dto';
import { MenuDTO } from '../dtos/menu.dto';
import { ResponseOrderDto } from '../dtos/order.dto';
import models from '../models';
import { callGemini } from '../utils/callGemini';

const { ChatHistory, MenuBooth, Intent } = models;

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

// Intent diambil dari tabel `intents` (bukan hardcode) supaya bisa ditambah/diubah
// lewat DB tanpa deploy. Di-cache singkat di memory (bukan query tiap chat) karena
// intent jarang berubah - TTL pendek supaya perubahan tetap kepakai cepat.
const INTENT_CACHE_TTL_MS = 60_000;
let intentCache: { data: Array<{ code: string; promptInstruction: string }>; expiresAt: number } | null = null;

const getActiveIntents = async (): Promise<Array<{ code: string; promptInstruction: string }>> => {
  if (intentCache && intentCache.expiresAt > Date.now()) {
    return intentCache.data;
  }

  const rows = await Intent.findAll({
    where: { isActive: true },
    order: [['sortOrder', 'ASC']],
  });

  const data = rows.map((row: any) => ({
    code: row.code as string,
    promptInstruction: row.promptInstruction as string,
  }));

  intentCache = { data, expiresAt: Date.now() + INTENT_CACHE_TTL_MS };
  return data;
};

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

  const activeIntents = await getActiveIntents();
  const intentInstructions = activeIntents
    .map(i => `- ${i.code} → ${i.promptInstruction}`)
    .join('\n');
  const intentEnum = [...activeIntents.map(i => i.code), 'OTHER'].join(' | ');

  const prompt = fillTemplate(loadPromptTemplate(), {
    NAME: name,
    EMAIL: email,
    CHAT: chat,
    DAFTAR_MENU: daftarMenu,
    DAFTAR_ORDER: daftarOrder,
    HAS_ORDER: String(daftarOrder !== 'EMPTY'),
    INTENT_INSTRUCTIONS: intentInstructions,
    INTENT_ENUM: intentEnum,
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
