// composables/useChatSocket.ts
import { io, Socket } from 'socket.io-client';
import { ref, onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '@/store/user';
import { IChatbot } from '@/models/IChatbot';
import { useRoomChat } from '@/views/room-chat/RoomChat.logic';

export function useChatSocket() {
    const userStore = useUserStore();
    const socket = ref<Socket | null>(null);
    const { messages } = useRoomChat();

    // Connect when email is available
    watch(
        () => userStore.userInfo.email,
        (email) => {
            if (!email || socket.value) return;

            socket.value = io(import.meta.env.VITE_API_WEBSOCKET, {
                transports: ['websocket'],
                query: { email },
            });

            socket.value.on('connect', () => {
                console.log('✅ Connected to socket:', socket.value?.id);
            });

            socket.value.on('message', (_data) => {
                const { type, payload } = JSON.parse(_data)
                if (['chat_sent', 'chat_response'].includes(type)) {
                    messages.value.push(payload);
                }
            });

            socket.value.on('disconnect', (reason) => {
                console.warn('❌ Disconnected:', reason);
            });

            socket.value.on('connect_error', (err) => {
                console.error('❌ Connection error:', err.message);
            });
        },
        { immediate: true }
    );

    const sendMessage = (payload: IChatbot) => {
        if (!socket.value) return;
        socket.value.emit('chat', payload);
    };

    onBeforeUnmount(() => {
        socket.value?.disconnect();
    });

    return {
        socket,
        messages,
        sendMessage,
    };
}