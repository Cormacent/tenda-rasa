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

            socket.value = io(import.meta.env.VITE_API_WEBSOCKET, {
                path: '/ws',
                query: { email },
                transports: ['websocket']
            })

            socket.value.on('connect', () => {
                console.log('✅ Connected to socket:', socket.value?.id)
            })

            socket.value.on('message', (data: IChatbot) => {
                messages.value.push(data)
            })
        },
        { immediate: true }
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