<template>
    <section id="ExploreBooth" class="relative min-h-screen pb-20 bg-gradient-to-b from-white/20 to-white">
        <!-- Title & Search -->
        <div class="px-4 pt-6">
            <h2 class="text-2xl font-bold text-black mb-2">
                Temukan Makanan Favorit kamu!
            </h2>
            <el-input v-model="search" placeholder="Apa yang mau kamu pesan?" clearable
                class="w-full focus:ring focus:ring-blue-300 rounded-md">
                <template #prefix>
                    <icon-ep-search class="text-gray-400" />
                </template>
            </el-input>
        </div>

        <!-- Booth Cards -->
        <div class="px-4 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <el-card v-for="booth in filteredBooths" :key="booth.id" class="w-full shadow-md">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-800">
                        {{ booth.booth_name }}
                    </h3>
                    <span class="text-sm text-gray-500">
                        {{ booth.estimated_minutes }} menit
                    </span>
                </div>
            </el-card>
        </div>
        <!-- Bottom Navigation -->
        <BottomNavbar />
    </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import BottomNavbar from '@/components/bottom-navbar/BottomNavbar.vue'
import type { IMenu } from '@/models/IMenu'

const search = ref('')

const booths = ref<IMenu[]>([
    {
        id: 1,
        booth_name: 'Sate Khas Senayan',
        menu_name: '',
        description: '',
        price: 0,
        tags: [],
        category: '',
        menu_type: '',
        spiciness_level: 0,
        image_url: '',
        stock: 0,
        is_available: true,
        estimated_minutes: 15,
        is_favorite: false,
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
    },
    {
        id: 2,
        booth_name: 'Healthy Food',
        menu_name: '',
        description: '',
        price: 0,
        tags: [],
        category: '',
        menu_type: '',
        spiciness_level: 0,
        image_url: '',
        stock: 0,
        is_available: true,
        estimated_minutes: 8,
        is_favorite: false,
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
    },
])

const filteredBooths = computed(() =>
    booths.value.filter((booth: IMenu) =>
        booth.booth_name.toLowerCase().includes(search.value.toLowerCase())
    )
)
</script>

<style lang="scss" scoped src="./ExploreBooth.scss" />