<template>
    <section id="ExploreBooth" class="flex flex-col h-full bg-gradient-to-b from-white/20 to-white container mx-auto px-4 pt-4">
        <!-- Title & Search -->
        <div class="shrink-0 mb-4">
            <div class="flex justify-between items-start">
                <h2 class="text-3xl font-bold text-black">
                    Temukan Makanan <br /> Favorit kamu!
                </h2>
                <div class="rounded-2xl bg-white shadow-md p-2 ml-2">
                    <icon-ep-bell class="text-primary text-3xl" />
                </div>
            </div>

            <el-input v-model="menupageInfo.filters.search" placeholder="Apa yang mau kamu pesan?" clearable
                class="custom-input w-full rounded-xl bg-secondary mt-4">
                <template #prefix>
                    <icon-ep-search class="text-primary" />
                </template>
            </el-input>
        </div>

        <!-- Booth Cards Scroll Area -->
        <div class="flex-1 overflow-y-auto grid grid-cols-1 grid-cols-2 gap-4 pb-4">
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
                        class="w-24 h-24 object-cover rounded-lg mb-4 bg-primary" />
                    <h3 class="text-lg font-semibold text-gray-800 text-center whitespace-normal break-words w-full">
                        {{ menu.menuName }}
                    </h3>
                    <p class="text-sm text-gray-500 text-center mt-2">
                        {{ menu.estimatedMinutes }} menit
                    </p>
                </el-card>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/store/menu';
import { computed, onMounted } from 'vue';
import { importImage } from '@/utils/helper';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const menuStore = useMenuStore()


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
    menupageInfo.value.limit = 10
    await menuStore.getMenuPage()
})
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------

</script>

<style lang="scss" scoped src="./ExploreBooth.scss" />