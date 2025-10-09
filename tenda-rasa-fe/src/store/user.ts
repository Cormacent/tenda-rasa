import { IUser } from "@/models/IUser";
import { ElMessageBox } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref<IUser>({
        name: '',
        email: '',
    });

    const confirmLogout = async (router: ReturnType<typeof useRouter>) => {
        await ElMessageBox.confirm(
            'Are you sure you want to log out?',
            'Logout Confirmation',
            {
                confirmButtonText: 'Yes, log out',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(() => {
                logout(router)
            })

    }

    const logout = (router: ReturnType<typeof useRouter>) => {
        userInfo.value = { name: '', email: '' };
        router.replace({ name: 'introduction' });
    };


    return {
        userInfo,
        confirmLogout
    }
},
    {
        persist: {
            key: 'user-store',
            paths: ['userInfo'],
            storage: localStorage
        } as any
    }
)
