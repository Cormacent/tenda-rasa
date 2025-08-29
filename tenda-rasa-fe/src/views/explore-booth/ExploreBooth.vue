<template>
    <section id="ExploreBooth"
        class="flex flex-col h-full bg-gradient-to-b from-white/20 to-white container mx-auto px-4">
        <!-- Title & Search -->
        <div class="shrink-0 my-5">
            <div class="flex justify-between items-start">
                <h2 class="text-3xl font-bold text-black">
                    Temukan Makanan <br /> Favorit kamu!
                </h2>
                <!-- <div class="rounded-2xl bg-white shadow-md p-2 ml-2">
                    <icon-ep-bell class="text-primary text-3xl" />
                </div> -->
            </div>

            <el-input v-model="menupageInfo.filters.menuName" placeholder="Apa yang mau kamu pesan?" clearable
                @input="getMenuPage" class="w-full mt-4" input-style="color: var(--el-color-primary);">
                <template #prefix>
                    <icon-ep-search class="text-primary" />
                </template>
            </el-input>
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
                        <h3 class="text-lg font-semibold text-gray-700 text-center w-full line-clamp-2">
                            {{ menu.menuName }}
                        </h3>

                        <p class="text-sm text-gray-700 text-center mt-2">
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
    menupageInfo.value.limit = 1000
    await getMenuPage()
})
const getMenuPage = async () => {
    await menuStore.getMenuPage()
}
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------

</script>

<style lang="scss" scoped src="./ExploreBooth.scss" />