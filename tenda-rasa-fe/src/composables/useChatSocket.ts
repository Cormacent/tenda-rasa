// composables/useChatSocket.ts
import { io, Socket } from 'socket.io-client';
import { ref, onBeforeUnmount, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';
import { IChatbot } from '@/models/IChatbot';
import { useRoomChat } from '@/views/room-chat/RoomChat.logic';
import { IOrder } from '@/models/IOrder';

export function useChatSocket() {
    const userStore = useUserStore();
    const socket = ref<Socket | null>(null);
    const { messages } = useRoomChat();
    const isOnline = ref<Boolean>(false)

    // Connect when email is available; clear messages on email change (logout → new login)
    watch(
        () => userStore.userInfo.email,
        (email, prevEmail) => {
            if (!email) return;

            // If switching to a different user, clear old messages
            if (prevEmail && email !== prevEmail) {
                messages.value = [];
                socket.value?.disconnect();
                socket.value = null;
            }

            if (socket.value) return;

            socket.value = io(import.meta.env.VITE_API_WEBSOCKET, {
                transports: ['websocket'],
                query: { email },
            });

            socket.value.on('connect', () => {
                console.log('✅ Connected to socket:', socket.value?.id);
                isOnline.value = true
            });

            socket.value.on('message', (_data) => {
                const { type, payload } = _data
                if (['chat_sent', 'chat_response'].includes(type)) {
                    // Prevent duplicate: skip if message already exists (from getAllChat API response)
                    const exists = messages.value.some(m => m.id === payload.id);
                    if (!exists) {
                        messages.value.push(payload);
                    }
                }
                if (['order_status_updated'].includes(type)) {
                    const { order } = payload
                    patchOrderInMessages(order)
                }
                if (type === 'ERROR') {
                    ElMessage.error(payload?.message || 'Terjadi kesalahan, coba lagi.')
                }
            });

            socket.value.on('disconnect', (reason) => {
                console.warn('❌ Disconnected:', reason);
                isOnline.value = false
            });

            socket.value.on('connect_error', (err) => {
                console.error('❌ Connection error:', err.message);
                isOnline.value = false
                ElMessage.error('Gagal terhubung ke server, cek koneksi kamu.')
            });
        },
        { immediate: true }
    );

    const sendMessage = (payload: IChatbot) => {
        if (!socket.value) return;
        socket.value.emit('chat', payload);
    };

    const requestCartSummary = (payload: IChatbot) => {
        if (!socket.value) return;
        socket.value.emit('chat', payload);
    };

    onBeforeUnmount(() => {
        socket.value?.disconnect();
    });

    const patchOrderInMessages = (updatedOrder: IOrder) => {
        for (const msg of messages.value) {
            if (msg.message?.orders) {
                for (let i = 0; i < msg.message.orders.length; i++) {
                    if (msg.message.orders[i].id === updatedOrder.id) {
                        msg.message.orders[i] = { ...msg.message.orders[i], ...updatedOrder };
                    }
                }
            }
        }
    };


    const clearMessages = () => {
        messages.value = [];
    };

    return {
        socket,
        messages,
        sendMessage,
        requestCartSummary,
        isOnline,
        clearMessages
    };
}