import { ChatDTO, ChatMessageDTO } from '../dtos/chat.dto';
import { MenuDTO } from '../dtos/menu.dto';
import models from '../models';
import { callGemini } from '../utils/callGemini';

const { ChatHistory, MenuBooth } = models;

export const saveMessage = async (chatData: ChatDTO): Promise<ChatDTO> => {
  return await ChatHistory.create(chatData);
};

export const getConversationByEmail = async (email: string): Promise<ChatDTO[]> => {
  return await ChatHistory.findAll({
    where: { email },
    order: [['timestamp', 'ASC']]
  });
};

export const getConversationById = async (id: number): Promise<ChatDTO> => {
  return await ChatHistory.findByPk(id)
};

export async function generateChatResponse({ name, email, message }: ChatDTO): Promise<ChatMessageDTO> {
  const { menus = [], chat = '' } = message || {}

  const daftarMenu = menus.map((menu: MenuDTO) => {
    const tags = menu.tags?.join(', ') || ''
    return `- [ID:${menu.id}] ${menu.menuName} [${tags}]`
  }).join('\n')

  const prompt = `
User bernama ${name} (${email}) bertanya: '${chat}'
Berikut adalah daftar menu yang tersedia (beserta ID dan tag):
${daftarMenu}

Tentukan apakah permintaan user termasuk:
- INTENT: GREETING → jika user hanya menyapa (seperti 'halo', 'hai', 'Selamat Pagi', dll)
- INTENT: ORDER_STATUS → jika user bertanya tentang status pesanannya
- INTENT: RECOMMENDATION → jika user meminta saran makanan atau daftar menu
- INTENT: EXPLANATION → jika user ingin penjelasan menu tertentu
- INTENT: OTHER → jika tidak berkaitan dengan daftar menu

Instruksi:
- Jika respon kamu memberikan judul menu, gausah kirim beserta ID
- Jika intent GREETING, balas ramah dan akrab seperti bot menyapa kembali.
- Jika intent ORDER_STATUS, cukup beri respon singkat bahwa akan dicek, dan jangan berikan data status apapun (itu akan ditangani sistem).
- Jika intent RECOMMENDATION, berikan saran menu dari daftar secara singkat dan menarik, seperti penjual yang ramah.
- Jika intent EXPLANATION, cukup beri jawaban untuk menjelaskan menu yang ditanya user tanpa menuIds.
- Jika intent OTHER, berikan semacam kalimat maaf pertanyaan hanya seputar Menu Tenda Rasa.
- Gunakan nama user agar lebih akrab.
- Jangan pernah tambahkan menu yang tidak ada di daftar.

Format hasil akhir:
- Jawaban utama di atas.
- Baris baru, lalu:
INTENT: [INTENT]
menuIds: [1, 2, ...] (jika ada menu yang direkomendasikan jika intent berupa RECOMMENDATION)
`

  const geminiResponse = await callGemini(prompt)
  console.log("🚀 ~ generateChatResponse ~ prompt:", prompt)
  console.log("🚀 ~ generateChatResponse ~ geminiResponse:", geminiResponse)
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
