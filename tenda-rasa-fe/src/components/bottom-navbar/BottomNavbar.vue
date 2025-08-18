<template>
    <div class="w-screen h-full bg-white border-t shadow z-50 align-center flex">
        <nav class="flex justify-around my-auto w-full">
            <el-button @click="openLink('explore-booths')" :class="[
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
                isActive('explore-booths')
                    ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                    : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
            ]">
                <div class="flex items-center gap-2"
                    :class="isActive('explore-booths') ? 'text-white' : 'text-primary'">
                    <icon-ep-house />
                    <span v-if="isActive('explore-booths')">Home</span>
                </div>
            </el-button>

            <el-button @click="openLink('order-list')" :class="[
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
                isActive('order-list')
                    ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                    : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
            ]">
                <div class="flex items-center gap-2" :class="isActive('order-list') ? 'text-white' : 'text-primary'">
                    <icon-ep-document />
                    <span v-if="isActive('order-list')">Orders</span>
                </div>
            </el-button>

            <el-button @click="openLink('checkout')" :class="[
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
                isActive('checkout')
                    ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                    : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
            ]">
                <div class="flex items-center gap-2" :class="isActive('checkout') ? 'text-white' : 'text-primary'">
                    <icon-ep-shopping-cart />
                    <span v-if="isActive('checkout')">Cart</span>
                </div>
            </el-button>

            <el-button @click="openLink('room-chat')" :class="[
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
                isActive('room-chat')
                    ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                    : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
            ]">
                <div class="flex items-center gap-2" :class="isActive('room-chat') ? 'text-white' : 'text-primary'">
                    <icon-ep-chat-dot-round />
                    <span v-if="isActive('room-chat')">Chat</span>
                </div>
            </el-button>
        </nav>

        <ModalUserInfo v-model:visible="visibleModal" @submit="openLink(savedLink ?? '')" />
    </div>
</template>



<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const visibleModal = ref<boolean>(false)
const savedLink = ref<string>()

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const userInfo = computed(() => userStore.userInfo)
//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const openLink = (name: string) => {
    if (name !== 'explore-booths' && (!userStore.userInfo || userStore.userInfo.name === '' || userStore.userInfo.email === '')) {
        visibleModal.value = true
        savedLink.value = name
        return
    }
    router.push({ name })
}
const isActive = (name: string): boolean => {
    return route.path?.toString().includes(name)
}

</script>

<style scoped>
/* Custom styling if needed */
</style>