<template>
  <section id="OrderStatus" class="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
    <h2 class="text-xl font-bold text-primary mb-6 text-center sm:text-left">Rincian Pesanan</h2>

    <!-- Daftar Item -->
    <div v-for="item in orderItems" :key="item.id" class="mb-4 border-b pb-4">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800">{{ item.menuName }}</h3>
          <h3 class="text-base text-gray-800">{{ item.remarks }}</h3>
        </div>
        <div class="text-right sm:text-left">
          <p class="text-sm text-gray-600">{{ item.quantity }}x</p>
          <p class="text-base font-medium text-gray-900">Rp {{ formatPrice(item.price ?? 0) }}</p>
        </div>
      </div>
    </div>

    <!-- Ringkasan -->
    <div class="mt-6 space-y-2 text-sm text-gray-700 max-w-md mx-auto sm:mx-0">
      <div class="flex justify-between font-bold text-primary text-base">
        <span>Total</span>
        <span>Rp {{ formatPrice(total ?? 0) }}</span>
      </div>
    </div>

    <!-- Tombol -->
    <div class="mt-8 max-w-md mx-auto sm:mx-0" v-if="!orderId">
      <el-button type="primary" size="large" class="w-full" @click="createOrder">
        Lanjut Pembayaran
      </el-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useOrderStore } from '@/store/order'
import { formatPrice } from '@/utils/helper'
import { useUserStore } from '@/store/user'
import { useRoute, useRouter } from 'vue-router'

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const orderStore = useOrderStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const orderId = ref<string>('')
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
onMounted(() => {
  if (route.params?.orderId) {
    orderId.value = route.params?.orderId as string
  }
})
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const createOrder = async () => {
  await orderStore.createOrder({
    orderItems: orderItems.value,
    totalPrice: total.value,
    email: userStore.userInfo.email || '',
  }).then(() => {
    router.push({ name: 'room-chat' })
  }).catch((error) => {
    console.error('Error creating order:', error)
  })
}

</script>
