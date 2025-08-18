import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { IChatbot } from '@/models/IChatbot'
import { useUserStore } from './user'

export const useChatbotStore = defineStore('chatbot', () => {
    const urlGetAllChat = import.meta.env.VITE_API_BACKEND + '/chats';
    const response = ref<IChatbot>()
    const loading = ref(false)
    const error = ref<string | null>(null)
    const { userInfo } = useUserStore()
    const sendPrompt = async (prompt: string) => {
        loading.value = true
        error.value = null
        try {
            const body = {
                name: 'Zaki',
                email: 'zakimaulana08@gmail.com',
                prompt,
            }
            // const res = await axios.post(urlAIChat, body)
            // response.value = res.data?.response || ''
        } catch (err: any) {
            console.log("🚀 ~ sendPrompt ~ err:", err)
            error.value = err.message || 'Failed to fetch response'
        } finally {
            loading.value = false
        }
    }

    const getAllChatByEmail = async (): Promise<IChatbot[]> => {
        const { email } = userInfo

        loading.value = true
        error.value = null
        try {
            const body = { email }
            const res = await axios.post(urlGetAllChat + '/get-by-email', body)
            return res.data as IChatbot[] || []
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch chats'
            return []
        } finally {
            loading.value = false
        }
    }

    const getChatById = async (id: number): Promise<IChatbot | null> => {
        const { email } = userInfo
        const body = { email, id }

        loading.value = true
        error.value = null

        try {
            const { data } = await axios.post<IChatbot>(`${urlGetAllChat}/get-by-id`, body)
            return data
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Failed to fetch chats'
            error.value = message
            return null
        } finally {
            loading.value = false
        }
    }
    const clearResponse = () => {
        response.value = undefined
        loading.value = false
        error.value = null
    }

    return {
        response,
        loading,
        error,
        sendPrompt,
        clearResponse,
        getAllChatByEmail,
        getChatById
    }
})
