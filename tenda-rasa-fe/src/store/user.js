import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore('user', () => {
    const userInfo = ref({
        name: '',
        email: '',
    });
    return {
        userInfo
    };
}, {
    persist: {
        key: 'user-store',
        paths: ['userInfo'],
        storage: localStorage
    }
});
