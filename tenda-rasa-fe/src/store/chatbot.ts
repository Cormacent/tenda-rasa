import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { IChatbot } from '@/models/IChatbot'

export const useChatbotStore = defineStore('chatbot', () => {
    const urlAIChat = import.meta.env.VITE_API_N8N + '/ai-chat';
    const urlGetAllChat = import.meta.env.VITE_API_N8N + '/get-all-chat';
    const response = ref<IChatbot>()
    const loading = ref(false)
    const error = ref<string | null>(null)
    const sendPrompt = async (prompt: string) => {
        loading.value = true
        error.value = null
        try {
            const body = {
                name: 'Zaki',
                email: 'zakimaulana08@gmail.com',
                prompt,
            }
            const res = await axios.post(urlAIChat, body)
            response.value = res.data?.response || ''
        } catch (err: any) {
            console.log("🚀 ~ sendPrompt ~ err:", err)
            error.value = err.message || 'Failed to fetch response'
        } finally {
            loading.value = false
        }
    }

    const getAllChatByEmail = async (email: string): Promise<IChatbot[]> => {
        loading.value = true
        error.value = null
        try {
            const body = { email }
            const res = await axios.post(urlGetAllChat, body)
            return res.data as IChatbot[] || []
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch chats'
            return []
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
        clearResponse, getAllChatByEmail
    }
})
