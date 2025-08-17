import { io, Socket } from 'socket.io-client'
import { ref, watch, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/store/user'
import type { IChatbot } from '@/models/IChatbot'
import { useRoomChat } from '@/views/room-chat/RoomChat.logic';

export function useChatSocket() {
    const userStore = useUserStore()
    const socket = ref<Socket | null>(null)
    const { messages } = useRoomChat();

    // Connect when email is available
    watch(
        () => userStore.userInfo.email,
        (email) => {
            if (!email || socket.value) return

            const socketUrl = `${import.meta.env.VITE_API_WEBSOCKET}/ws`;

            socket.value = io(socketUrl, {
                transports: ['websocket'],
                query: {
                    email: 'zakimaulana08@gmail.com',
                },
            });
            if (socket.value) {
                socket.value.on('open', () => {
                    console.log('✅ WebSocket opened');
                });
                socket.value.on('message', (data: IChatbot) => {
                    messages.value.push(data)
                })
                socket.value.on('close', () => {
                    console.error('❌ close');
                });
            }



        },
        { immediate: true, deep: true }
    )

    // Emit message
    const sendMessage = (message: string) => {
        if (!socket.value) return
        socket.value.emit('message', { message })
    }

    // Cleanup on unmount
    onBeforeUnmount(() => {
        socket.value?.disconnect()
    })

    return {
        socket,
        messages,
        sendMessage
    }
}