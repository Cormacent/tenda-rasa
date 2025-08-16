import { IChatbot } from '@/models/IChatbot';
import { ref } from 'vue';

export function useRoomChat() {
  const mounted = ref(false);
  const message = ref('');
  const messages = ref<Array<IChatbot>>([]);

  return { message, mounted, messages };
}
