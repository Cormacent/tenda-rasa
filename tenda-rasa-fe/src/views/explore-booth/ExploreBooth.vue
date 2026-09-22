<template>
    <section id="ExploreBooth"
        class="flex flex-col h-full bg-gradient-to-b from-white/20 to-white container mx-auto px-4">
        <!-- Title & Search -->
        <div class="shrink-0 my-5">
            <!-- Logo Center + Info -->
            <div class="flex flex-col items-center gap-2 mb-4">
                <img src="/logo-explore.svg" alt="Pizza Kuzuka" class="h-14 w-auto" />
                <div class="flex items-center gap-4 text-gray-600 text-sm">
                    <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        @pizzakuzuka.id
                    </span>
                    <span>|</span>
                    <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C7.802 0 4.4 3.402 4.4 7.6c0 5.601 7.6 14.4 7.6 14.4s7.6-8.799 7.6-14.4C19.6 3.402 16.198 0 12 0zm0 10.2c-1.428 0-2.6-1.172-2.6-2.6s1.172-2.6 2.6-2.6 2.6 1.172 2.6 2.6-1.172 2.6-2.6 2.6z"/></svg>
                        Based in Beji, Kota Depok
                    </span>
                </div>
            </div>

            <!-- Search Bar -->
            <el-input v-model="menupageInfo.filters.menuName" placeholder="Apa yang mau kamu pesan?" clearable
                @input="getMenuPage" class="w-full">
                <template #prefix>
                    <icon-ep-search class="text-primary" />
                </template>
            </el-input>
        </div>

        <!-- Logout Button - Top Right -->
        <div class="absolute top-4 right-4" v-if="hasUser">
            <el-button @click="logout()" class="rounded bg-white"
                style="background-color: var(--el-color-primary-light-3); border-color: var(--el-color-primary-light-3);">
                <icon-ep-switch-button class="text-primary" />
            </el-button>
        </div>

        <!-- Booth Cards Scroll Area -->

        <div class="flex-1 overflow-y-auto">
            <div class="grid grid-cols-2 gap-4 py-4">
                <router-link v-for="menu in menuList" :key="menu.id"
                    :to="{ name: 'booth-detail', params: { menuId: menu.id } }" class="flex">
                    <el-card class="w-full shadow-md bg-white flex flex-col items-center justify-center" :body-style="{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }">
                        <img :src="menu.imageUrl ? menu.imageUrl : importImage('default.jpg')" alt="menu image"
                            class="w-24 h-24 object-cover rounded-lg mb-4" />
                        <h3 class="text-lg font-bold text-gray-900 text-center w-full line-clamp-2">
                        {{ menu.menuName }}
                        </h3>

                        <p class="text-base font-medium text-primary text-center mt-1">
                            Rp {{ formatPrice(menu.price ?? 0) }}
                        </p>

                        <p class="text-base font-semibold text-gray-800 text-center mt-1">
                            {{ menu.estimatedMinutes }} menit
                        </p>
                    </el-card>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/store/menu';
import { computed, onMounted } from 'vue';
import { formatPrice, importImage } from '@/utils/helper';
import router from '@/router';
import { useUserStore } from '@/store/user';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const menuStore = useMenuStore()
const { confirmLogout, userInfo } = useUserStore();


//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const menupageInfo = computed(() => menuStore.pageInfo)
const menuList = computed(() => menuStore.pageInfo.data)
const hasUser = computed(() => !!userInfo.email)
//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(async () => {
    menupageInfo.value.limit = 1000
    await getMenuPage()
})

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const logout = () => {
    confirmLogout(router)
}
const getMenuPage = async () => {
    await menuStore.getMenuPage()
}
</script>

<style lang="scss" scoped src="./ExploreBooth.scss" />