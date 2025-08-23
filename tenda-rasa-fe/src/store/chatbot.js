import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './user';
export const useChatbotStore = defineStore('chatbot', () => {
    const urlGetAllChat = import.meta.env.VITE_API_BACKEND + '/chats';
    const response = ref();
    const loading = ref(false);
    const error = ref(null);
    const { userInfo } = useUserStore();
    const getAllChatByEmail = async () => {
        const { email } = userInfo;
        loading.value = true;
        error.value = null;
        try {
            const body = { email };
            const res = await axios.post(urlGetAllChat + '/get-by-email', body);
            return res.data;
        }
        catch (err) {
            error.value = err.message || 'Failed to fetch chats';
            return [];
        }
        finally {
            loading.value = false;
        }
    };
    const getChatById = async (id) => {
        const { email } = userInfo;
        const body = { email, id };
        loading.value = true;
        error.value = null;
        try {
            const { data } = await axios.post(`${urlGetAllChat}/get-by-id`, body);
            return data;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch chats';
            error.value = message;
            return null;
        }
        finally {
            loading.value = false;
        }
    };
    const clearResponse = () => {
        response.value = undefined;
        loading.value = false;
        error.value = null;
    };
    return {
        response,
        loading,
        error,
        clearResponse,
        getAllChatByEmail,
        getChatById
    };
});
