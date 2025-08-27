// composables/useChatSocket.ts
import { io } from 'socket.io-client';
import { ref, onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '@/store/user';
import { useRoomChat } from '@/views/room-chat/RoomChat.logic';
export function useChatSocket() {
    const userStore = useUserStore();
    const socket = ref(null);
    const { messages } = useRoomChat();
    const isOnline = ref(false);
    // Connect when email is available
    watch(() => userStore.userInfo.email, (email) => {
        if (!email || socket.value)
            return;
        socket.value = io(import.meta.env.VITE_API_WEBSOCKET, {
            transports: ['websocket'],
            query: { email },
        });
        socket.value.on('connect', () => {
            console.log('✅ Connected to socket:', socket.value?.id);
            isOnline.value = true;
        });
        socket.value.on('message', (_data) => {
            const { type, payload } = _data;
            if (['chat_sent', 'chat_response'].includes(type)) {
                messages.value.push(payload);
            }
            if (['order_status_updated'].includes(type)) {
                const { order } = payload;
                patchOrderInMessages(order);
            }
        });
        socket.value.on('disconnect', (reason) => {
            console.warn('❌ Disconnected:', reason);
            isOnline.value = false;
        });
        socket.value.on('connect_error', (err) => {
            console.error('❌ Connection error:', err.message);
            isOnline.value = false;
        });
    }, { immediate: true });
    const sendMessage = (payload) => {
        if (!socket.value)
            return;
        socket.value.emit('chat', payload);
    };
    onBeforeUnmount(() => {
        socket.value?.disconnect();
    });
    const patchOrderInMessages = (updatedOrder) => {
        console.log("🚀 ~ patchOrderInMessages ~ updatedOrder:", updatedOrder);
        for (const msg of messages.value) {
            if (msg.message?.orders) {
                for (let i = 0; i < msg.message.orders.length; i++) {
                    if (msg.message.orders[i].id === updatedOrder.id) {
                        console.log("🚀 ~ BEFORE ~ msg.message.orders[i]:", msg.message.orders[i]);
                        msg.message.orders[i] = { ...msg.message.orders[i], ...updatedOrder };
                        console.log("🚀 ~ AFTER ~ msg.message.orders[i]:", msg.message.orders[i]);
                    }
                }
            }
        }
    };
    return {
        socket,
        messages,
        sendMessage,
        isOnline
    };
}
