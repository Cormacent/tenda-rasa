import { ref } from 'vue';

export function useRoomChat() {
  const mounted = ref(false);
  const message = ref('');
  return { message, mounted };
}
