<template>
    <div>
        <nav class="w-full h-full bg-white border-t shadow-md flex justify-around py-2 z-50">

            <el-button plain @click="openLink('explore-booths')" :class="[
                'flex items-center gap-2 px-3 py-2 rounded',
                isActive('explore-booths') ? 'bg-primary text-white' : 'bg-transparent text-primary border-none shadow-none'
            ]">
                <div class="flex items-center gap-2">
                    <icon-ep-house :class="isActive('explore-booths') ? 'text-white' : 'text-primary'" />
                    <span v-if="isActive('explore-booths')">Home</span>
                </div>
            </el-button>

            <el-button plain @click="openLink('order-list')" :class="[
                'flex items-center gap-2 px-3 py-2 rounded',
                isActive('order-list') ? 'bg-primary text-white' : 'bg-transparent text-primary border-none shadow-none'
            ]">
                <div class="flex items-center gap-2">
                    <icon-ep-document :class="isActive('order-list') ? 'text-white' : 'text-primary'" />
                    <span v-if="isActive('order-list')">Orders</span>
                </div>
            </el-button>

            <el-button plain @click="openLink('checkout')" :class="[
                'flex items-center gap-2 px-3 py-2 rounded',
                isActive('checkout') ? 'bg-primary text-white' : 'bg-transparent text-primary border-none shadow-none'
            ]">
                <div class="flex items-center gap-2">
                    <icon-ep-shopping-cart :class="isActive('checkout') ? 'text-white' : 'text-primary'" />
                    <span v-if="isActive('checkout')">Cart</span>
                </div>
            </el-button>

            <el-button plain @click="openLink('room-chat')" :class="[
                'flex items-center gap-2 px-3 py-2 rounded',
                isActive('room-chat') ? 'bg-primary text-white' : 'bg-transparent text-primary border-none shadow-none'
            ]">
                <icon-ep-chat-dot-round />
                <span v-if="isActive('room-chat')">Chat</span>
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
    if (name !== 'explore-booth' && !userStore.userInfo || userStore.userInfo.name === '' || userStore.userInfo.email === '') {
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