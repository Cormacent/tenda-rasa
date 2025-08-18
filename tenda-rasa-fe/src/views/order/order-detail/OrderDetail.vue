<template>
  <section id="OrderStatus" class="flex flex-col h-full bg-white px-4 py-6 sm:px-6 lg:px-8">
    <!-- Scrollable Daftar Item -->
    <div class="flex-1 overflow-y-auto space-y-4 pr-1">
      <div v-for="item in orderItems" :key="item.id" class="bg-white shadow-md rounded-lg p-4 flex gap-4 w-full">
        <div class="flex">
          <img :src="item.imageUrl ? item.imageUrl : importImage('default.jpg')" alt="menu image"
            class="w-24 h-24 object-cover rounded-lg bg-primary" />
        </div>
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800">
            {{ item.boothName }}
          </h3>
          <p class="text-gray-300">{{ item.menuName }}</p>
          <div class="flex justify-between gap-3">
            <div class="text-small">
              <p>{{ item.quantity }}x</p>
              <p>{{ item.remarks }}</p>
            </div>
            <p class="text-base font-medium text-primary">
              Rp {{ formatPrice(item.price ?? 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ringkasan & Tombol -->
    <div class="shrink-0 pt-6 space-y-4 max-w-md mx-auto sm:mx-0 w-full bg-primary rounded-lg p-4">
      <div class="text-sm text-white">
        <div class="flex justify-between font-bold text-white text-base">
          <span>Total</span>
          <span>Rp {{ formatPrice(total ?? 0) }}</span>
        </div>
      </div>

      <div v-if="!orderId">
        <el-button type="primary" size="large" class="w-full bg-white text-primary rounded-lg" @click="createOrder">
          Lanjut Pembayaran
        </el-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useOrderStore } from '@/store/order'
import { formatPrice } from '@/utils/helper'
import { useUserStore } from '@/store/user'
import { useRoute, useRouter } from 'vue-router'
import { importImage } from '@/utils/helper';

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
    name: userStore.userInfo.name || ''
  }).then(() => {
    router.push({ name: 'room-chat' })
  }).catch((error) => {
    console.error('Error creating order:', error)
  })
}

</script>
