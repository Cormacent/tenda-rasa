import { ref } from 'vue';
export function useRoomChat() {
    const mounted = ref(false);
    const message = ref('');
    const messages = ref([]);
    return { message, mounted, messages };
}
