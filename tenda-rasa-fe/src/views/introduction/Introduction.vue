<template>
    <section id="Introduction" class="flex flex-col h-full justify-center gap-5" ref="Introduction">
        <div class="shrink-0 text-center mb-2 container mx-auto px-4">
            <h1 class="text-4xl md:text-4xl font-bold mb-6 text-black">Temukan Makanan Favorit kamu!</h1>
        </div>

        <!-- Swiper Wrapper (di luar layout konten) -->
        <div class="relative overflow-visible px-0">
            <div class="swiper-layout-wrapper overflow-visible   relative">
                <Swiper :modules="modules" :space-between="20" :slides-per-view="1.2" :centeredSlides="true"
                    :initial-slide="0" :loop="false" :pagination="{
                        clickable: true,
                        bulletClass: 'swiper-dot',
                        bulletActiveClass: 'swiper-dot-active'
                    }" class="custom-swiper">
                    <SwiperSlide v-for="menu in menuList" :key="menu.id" @click="openMenu(menu.id)">
                        <div class="bg-white shadow rounded-xl mb-5 flex flex-col items-center overflow-hidden">
                            <img :src="menu.imageUrl ? menu.imageUrl : importImage('default.jpg')" :alt="menu.menuName"
                                class="w-full h-40 md:h-60 object-cover rounded-t-xl mb-4" />

                            <div class="items-center px-4">
                                <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ menu.menuName }}</h3>
                                <p class="text-sm text-gray-700 mb-3">{{ menu.description }}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div class="flex align-center justify-center background-transparent mt-4">
                    <RouterLink :to="{ name: 'explore-booths' }">
                        <el-button
                            class="px-3 py-2 rounded focus:outline-none active:outline-none bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary"
                            size="large">Jelajahi</el-button>
                    </RouterLink>

                </div>

            </div>
        </div>

        <!-- Footer Description -->
        <div class="relative z-10 text-center pt-3  container mx-auto px-4">
            <p class="text-sm text-gray-700 max-w-md mx-auto">Perut mulai keroncongan? Haus menyerang?
                <span class="text-primary hover:underline" @click="openLink('room-chat')">
                    Tanya chatbot
                    aja!
                </span>

            </p>
        </div>
        <ModalUserInfo v-model:visible="visibleModal" @submit="openLink(savedLink ?? '')" />
    </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, } from 'vue'
import { importImage } from '@/utils/helper';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { useMenuStore } from '@/store/menu'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import ModalUserInfo from '@/components/modal-user-info/ModalUserInfo.vue'

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const menuStore = useMenuStore()

const modules = [Navigation, Pagination]
const visibleModal = ref<boolean>(false)
const userStore = useUserStore()
const router = useRouter()
const savedLink = ref<string>()

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const menupageInfo = computed(() => menuStore.pageInfo)
const menuList = computed(() => menuStore.pageInfo.data)
//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(async () => {
    menupageInfo.value.limit = 4
    await menuStore.getMenuPage()
})
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const openLink = (name: string) => {
    if (name !== 'explore-booths' && (!userStore.userInfo || userStore.userInfo.name === '' || userStore.userInfo.email === '')) {
        visibleModal.value = true
        savedLink.value = name
        return
    }
    router.replace({ name })
}
const openMenu = (menuId?: number) => {
    router.replace({ name: 'booth-detail', params: { menuId } })
}
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