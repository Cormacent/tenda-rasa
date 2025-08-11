<template>
    <section id="Introduction" class="relative overflow-hidden flex flex-col justify-center items-center">
        <div
            class="relative z-10 flex flex-col justify-center items-center px-6 text-center w-full max-w-screen-md mx-auto">
            <h1 class="text-2xl md:text-4xl font-bold mb-6 text-black">Temukan Makanan Favorit kamu!</h1>
        </div>

        <!-- Swiper Wrapper (di luar layout konten) -->
        <div class="relative w-screen overflow-visible px-0">
            <div class="swiper-layout-wrapper overflow-visible px-6 md:px-16 relative">
                <Swiper :modules="modules" :space-between="20" :slides-per-view="1.2" :centeredSlides="true"
                    :initial-slide="0" :loop="false" :pagination="{
                        clickable: true,
                        bulletClass: 'swiper-dot',
                        bulletActiveClass: 'swiper-dot-active'
                    }" class="custom-swiper">
                    <SwiperSlide v-for="menu in menus" :key="menu.id">
                        <div class="bg-white shadow rounded-xl p-4 mb-5 flex flex-col items-center">
                            <img :src="menu.image_url" :alt="menu.menu_name"
                                class="w-40 h-40 object-cover rounded-md mb-4" />
                            <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ menu.menu_name }}</h3>
                            <p class="text-sm text-gray-500 mb-3">{{ menu.description }}</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div class="flex align-center justify-center background-transparent">
                    <RouterLink :to="{ name: 'explore-booths' }">
                        <el-button class="btn-gradient" size="large">Jelajahi</el-button>
                    </RouterLink>

                </div>

            </div>
        </div>

        <!-- Footer Description -->
        <div class="relative z-10 px-6 text-center">
            <p class="text-sm text-gray-600 max-w-md mx-auto">Perut mulai keroncongan? Haus menyerang? <RouterLink
                    :to="{ name: 'room-chat' }">
                    <span class="text-primary hover:underline">
                        Tanya chatbot
                        aja!
                    </span>

                </RouterLink>
            </p>
        </div>
    </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

import { useMenuStore } from '@/store/menu'
import { on } from 'events'

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const menuStore = useMenuStore()

const modules = [Navigation, Pagination]

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const menus = computed(() => menuStore.menuList)

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(async () => {
    await menuStore.getAllMenus()
})
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------


</script>
<style scoped src="./Introduction.scss"></style>
<style lang="scss">
.swiper-pagination {
    bottom: 2px !important;
    position: absolute;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}
</style>