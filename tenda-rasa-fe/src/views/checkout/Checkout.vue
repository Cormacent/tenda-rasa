<template>
  <section id="Checkout"
    class="relative bg-gradient-to-b from-white/20 to-white h-[calc(100vh-7rem)] container mx-auto px-4">
    <h2 class="text-xl font-bold text-primary mb-6 text-center sm:text-left">Rincian Pesanan</h2>

    <!-- Daftar Item -->
    <div class="absolute left-0 right-0 overflow-y-auto px-4  gap-4" :style="{ top: '140px', bottom: '5px' }">
      <div class="flex flex-col gap-1">
        <div v-for="item in orderItems" :key="item.id" class="border-b ">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <img :src="item.imageUrl ? item.imageUrl : importImage('default.jpg')" alt="menu image"
              class="w-24 h-24 object-cover rounded-full   bg-primary" />

            <div class="flex-1">
              <h3 class="text-base font-semibold text-gray-800">{{ item.menuName }}</h3>
              <el-input v-model="item.remarks" placeholder="Masukkan Catatan (optional)" class="mt-2 w-full"
                size="small" clearable />
            </div>
            <div class="text-right sm:text-left">
              <p class="text-sm text-gray-600">{{ item.quantity }}x</p>
              <p class="text-base font-medium text-gray-900">Rp {{ formatPrice(item.price ?? 0) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ringkasan -->
    <div class="absolute bottom-0 left-0 right-0 px-4 py-2 border-t flex items-center justify-center">
      <div class="mt-6 space-y-2 text-sm text-gray-700 max-w-md mx-auto sm:mx-0">
        <div class="flex justify-between font-bold text-primary text-base">
          <span>Total</span>
          <span>Rp {{ formatPrice(total ?? 0) }}</span>
        </div>
      </div>

      <!-- Tombol -->
      <div class="mt-8 max-w-md mx-auto sm:mx-0">
        <el-button type="primary" size="large" class="w-full" @click="createOrder">
          Buat Pesanan
        </el-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useOrderStore } from '@/store/order'
import { formatPrice } from '@/utils/helper'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { importImage } from '@/utils/helper';

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const orderStore = useOrderStore()
const userStore = useUserStore()
const router = useRouter()
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const orderItems = computed(() => orderStore.orderItems)
const total = computed(() => orderItems.value.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0))

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const createOrder = async () => {
  router.push({ name: 'order-detail' })
}

</script>
