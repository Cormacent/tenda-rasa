import { ElMessageBox } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore('user', () => {
    const userInfo = ref({
        name: '',
        email: '',
    });
    const confirmLogout = async (router) => {
        await ElMessageBox.confirm('Are you sure you want to log out?', 'Logout Confirmation', {
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel',
            type: 'warning',
        })
            .then(() => {
            logout(router);
        });
    };
    const logout = (router) => {
        userInfo.value = { name: '', email: '' };
        router.replace({ name: 'introduction' });
    };
    return {
        userInfo,
        confirmLogout
    };
}, {
    persist: {
        key: 'user-store',
        paths: ['userInfo'],
        storage: localStorage
    }
});
