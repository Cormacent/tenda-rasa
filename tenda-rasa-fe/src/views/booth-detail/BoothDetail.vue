<template>
  <section id="BoothDetail" class="relative min-h-screen bg-white overflow-hidden">
    <!-- Background Image (di belakang, pudar bawah) -->
    <img
      :src="importImage('bg-tenda-rasa.svg')"
      alt="Background Tenda Rasa"
      class="absolute inset-0 w-full h-full object-cover z-0"
      style="mask-image: linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 80%)"
      @error="console.error('Image not found:', importImage('bg-tenda-rasa.svg'))"
    />

    <!-- Content -->
    <div class="relative z-10 max-w-2xl mx-auto px-6 py-10 bg-white/90 rounded-xl shadow-md">
      <!-- Header -->
      <h2 class="text-2xl font-bold text-primary mb-4">Sate Khas Senayan</h2>

      <!-- Menu Image -->
      <img
        :src="menu.image_url"
        alt="Sate Ayam"
        class="w-full h-60 object-cover rounded-lg mb-4"
        @error="console.error('Image not found:', menu.image_url)"
      />

      <!-- Description -->
      <p class="text-gray-700 mb-4">
        {{ menu.description }}
      </p>

      <!-- Details List -->
      <ul class="text-sm text-gray-600 space-y-1 mb-6">
        <li>⏱️ Estimasi: {{ menu.estimated_minutes }} menit</li>
        <li>🍽️ Cocok untuk makan siang atau malam</li>
        <li>🌶️ Pedas: {{ menu.spiciness_level }}/5</li>
        <li>🧄 Pilihan bumbu: Bumbu kacang / Bumbu kecap</li>
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
import type { IMenu } from '@/models/IMenu'
import { ref } from 'vue'

// Contoh 1 data menu, bisa disambungkan ke API/store
const menu = ref<IMenu>({
  id: 1,
  booth_name: 'Sate Khas Senayan',
  menu_name: 'Sate Ayam',
  description:
    'Potongan ayam empuk, dibakar di atas bara, disajikan dengan bumbu kacang kental dan bawang goreng. Bisa dinikmati dengan lontong atau nasi.',
  price: 35000,
  tags: ['sate', 'ayam', 'indonesia'],
  category: 'Main',
  menu_type: 'Food',
  spiciness_level: 2,
  image_url: importImage('menu-sate-senayan.jpg'),
  stock: 10,
  is_available: true,
  estimated_minutes: 15,
  is_favorite: false,
  created_at: '',
  updated_at: '',
  created_by: '',
  updated_by: '',
})
</script>

<style lang="scss" scoped src="./BoothDetail.scss" />