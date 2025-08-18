<template>
  <section id="Checkout" class="flex flex-col h-full bg-gradient-to-b from-white/20 to-white container mx-auto px-4">
    <!-- Scrollable Daftar Item -->
    <div class="flex-1 overflow-y-auto px-4 space-y-4">
      <div class="flex flex-col gap-4">
        <div v-for="item in orderItems" :key="item.id" class="border-b pb-4">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <img :src="item.imageUrl ? item.imageUrl : importImage('default.jpg')" alt="menu image"
              class="w-24 h-24 object-cover rounded-full bg-primary" />

            <div class="flex-1">
              <h3 class="text-base font-semibold text-gray-800">
                {{ item.menuName }}
              </h3>
              <el-input v-model="item.remarks" placeholder="Masukkan Catatan (optional)" class="mt-2 w-full"
                size="small" clearable />
            </div>

            <div class="text-right sm:text-left">
              <p class="text-sm text-gray-600">{{ item.quantity }}x</p>
              <p class="text-base font-medium text-gray-900">
                Rp {{ formatPrice(item.price ?? 0) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ringkasan & Tombol -->
    <div class="shrink-0 px-4 py-4 border-t bg-white space-y-4">
      <div class="text-sm text-gray-700 max-w-md mx-auto sm:mx-0">
        <div class="flex justify-between font-bold text-primary text-base">
          <span>Total</span>
          <span>Rp {{ formatPrice(total ?? 0) }}</span>
        </div>
      </div>

      <div class="max-w-md mx-auto sm:mx-0">
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
