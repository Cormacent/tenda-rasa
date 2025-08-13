<template>
  <section id="BoothDetail" class="relative min-h-screen  ite overflow-hidden">
    <!-- Content -->
    <div class="relative z-10 max-w-2xl mx-auto px-6 py-10 bg-white/90 rounded-xl shadow-md">
      <!-- Header -->
      <h2 class="text-2xl font-bold text-primary mb-4">{{ menuDetail.boothName }}</h2>
      <h2 class="text-xl font-bold text-secondary mb-4">{{ menuDetail.menuName }}</h2>

      <!-- Menu Image -->
      <img :src="menuDetail.imageUrl ? menuDetail.imageUrl : importImage('default.jpg')" alt="Sate Ayam"
        class="w-full h-60 object-cover rounded-lg mb-4"
        @error="console.error('Image not found:', menuDetail.imageUrl)" />

      <!-- Description -->
      <p class="text-gray-700 mb-4">
        {{ menuDetail.description }}
      </p>

      <!-- Details List -->
      <ul class="text-sm text-gray-600 space-y-1 mb-6">
        <li>⏱️ Estimasi: {{ menuDetail.estimatedMinutes }} menit</li>
        <li>🍽️ Cocok untuk {{ menuDetail.category == 'makanan' ? 'makan' : 'minum' }} siang atau malam</li>
        <li v-if="menuDetail.category == 'makanan'">🌶️ Pedas: {{ menuDetail.spicinessLevel }}/5</li>
      </ul>

      <!-- CTA Button -->
      <el-button type="danger" size="large" round>
        Masukkan ke Keranjang
      </el-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { importImage } from '@/utils/helper'
import { useMenuStore } from '@/store/menu'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const menuStore = useMenuStore()
const menuId = ref<string>()
const route = useRoute()


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const menuDetail = computed(() => menuStore.menuDetail || {})

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(async () => {
  menuId.value = route.params.menuId as string
  if (menuId.value) {
    await menuStore.getMenuById(+menuId.value)
  }
})
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------


</script>

<style lang="scss" scoped src="./BoothDetail.scss" />