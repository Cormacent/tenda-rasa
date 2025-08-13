<template>
    <section id="ExploreBooth" class="relative bg-gradient-to-b from-white/20 to-white">
        <!-- Title & Search -->
        <div class="px-4 pt-6">
            <div class="flex">
                <h2 class="text-3xl font-bold text-black mb-2">
                    Temukan Makanan Favorit kamu!
                </h2>
                <div>
                    <div class="rounded-2xl bg-white shadow-md p-2 ml-2">
                        <icon-ep-bell class="text-primary text-3xl" />

                    </div>
                </div>
            </div>
            <div class="flex between items-center mt-2 gap-2">
                <el-input v-model="menupageInfo.filters.search" placeholder="Apa yang mau kamu pesan?" clearable
                    class="custom-input w-full rounded-xl background-primary">
                    <template #prefix>
                        <icon-ep-search class="text-primary" />
                    </template>
                </el-input>

                <div>
                    <div class="rounded-2xl bg-white shadow-md p-2 ml-2">
                        <icon-ep-operation class="text-primary text-xl" />

                    </div>
                </div>
            </div>
        </div>

        <!-- Booth Cards -->
        <div class="px-4 mt-4 grid grid-cols-1 grid-cols-2 gap-4">
            <div v-for="menu in menuList" :key="menu.id">
                <router-link :to="{
                    name: 'booth-detail',
                    params: { menuId: menu.id }
                }
                    " class="block">
                    <el-card class="w-full shadow-md bg-white flex flex-col items-center justify-center" :body-style="{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }">
                        <img :src="menu.imageUrl ? menu.imageUrl : importImage('default.jpg')" alt="menu image"
                            class="w-24 h-24 object-cover rounded-full mb-4 background-primary" />
                        <h3
                            class="text-lg font-semibold text-gray-800 text-center whitespace-normal break-words w-full">
                            {{ menu.menuName }}
                        </h3>
                        <p class="text-sm text-gray-500 text-center mt-2">
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