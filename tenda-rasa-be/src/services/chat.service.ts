import { ChatDTO, ChatMessageDTO } from '../dtos/chat.dto';
import { MenuDTO } from '../dtos/menu.dto';
import { ResponseOrderDto } from '../dtos/order.dto';
import models from '../models';
import { callGemini } from '../utils/callGemini';

const { ChatHistory, MenuBooth } = models;

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

  const prompt = `
Kamu adalah TerraBot, virtual assistant untuk aplikasi Tenda Rasa, jawablah sesuai ketentuan dibawah

User bernama ${name} (${email}) mengirim pesan berikut:
'${chat}'

Berikut adalah daftar menu yang tersedia (dengan ID dan tag):
${daftarMenu}

Berikut adalah daftar order milik user ${name}:
${daftarOrder}

HAS_ORDER: ${daftarOrder !== 'EMPTY'}

Catatan penting:
- Format order selalu berupa baris seperti: - [ID:123] [STATUS:PAID]
- Jika daftar order berisi 'EMPTY' atau HAS_ORDER adalah false, berarti user belum memiliki pesanan aktif. Jangan berikan jawaban seolah ada pesanan.
- Jangan pernah berasumsi ada order jika HAS_ORDER adalah false.

Tugas kamu:
1. Tentukan INTENT dari pesan user berdasarkan daftar intent berikut:
   - GREETING → jika user hanya menyapa (contoh: 'halo', 'hai', 'selamat pagi', dll)
   - ORDER_STATUS → periksa nilai HAS_ORDER:
      - Jika false, jawab bahwa user belum memiliki pesanan aktif.
      - Jika true, baca status dari setiap order (PAID atau PENDING), dan berikan jawaban singkat bahwa pesanan sedang diproses. Jangan sebutkan status secara eksplisit (sistem akan menangani).
      - ⚠️ Jika INTENT adalah ORDER_STATUS, kamu wajib memeriksa daftar order dan tidak boleh menjawab seolah ada pesanan jika HAS_ORDER adalah false.
   - RECOMMENDATION → jika user meminta saran makanan atau minuman dari daftar menu
   - EXPLANATION → jika user ingin penjelasan tentang menu tertentu
   - OTHER → jika pesan tidak relevan dengan daftar menu

2. Berikan respon sesuai intent:
   - GREETING → balas dengan sapaan ramah dan akrab, seolah kamu adalah bot yang menyapa kembali. Gunakan nama user.
   - ORDER_STATUS → periksa nilai HAS_ORDER:
     - Jika false, jawab bahwa user belum memiliki pesanan aktif.
     - Jika true, baca status dari setiap order (PAID atau PENDING), dan berikan jawaban singkat bahwa pesanan sedang diproses. Jangan sebutkan status secara eksplisit (sistem akan menangani).
   - RECOMMENDATION → berikan saran menu dari daftar yang tersedia. Gunakan gaya bahasa seperti penjual yang ramah. Jangan sertakan ID menu dalam jawaban.
   - EXPLANATION → jelaskan menu yang ditanyakan user secara singkat dan jelas. Jangan sertakan ID menu.
   - OTHER → sampaikan dengan sopan bahwa kamu hanya bisa menjawab pertanyaan seputar Menu Tenda Rasa.

3. Aturan tambahan:
   - Jangan pernah menyebut atau merekomendasikan menu yang tidak ada di daftar.
   - Gunakan nama user dalam jawaban agar terasa lebih personal.
   - Jika kamu menyebutkan menu dalam jawaban (RECOMMENDATION), sertakan ID-nya di bagian akhir.
   - Jangan sebutkan ID order atau status order dalam jawaban.

Format output:
[Jawaban utama kamu di sini]

INTENT: [GREETING | ORDER_STATUS | RECOMMENDATION | EXPLANATION | OTHER]  
menuIds: [1, 2, ...] ← hanya isi jika INTENT adalah RECOMMENDATION
`;
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
