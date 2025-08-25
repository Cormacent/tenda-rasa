<template>
  <section id="OrderStatus" class="flex flex-col h-full px-4 py-6 sm:px-6 lg:px-8">
    <div class="absolute top-0 right-0 w-full h-full pointer-events-none -z-10" style="
    mask-image: linear-gradient(to bottom left, transparent 0%, white 45%, white 100%);
    mask-mode: alpha;
    background-color: white;
  "></div>

    <!-- Scrollable Daftar Item -->
    <div class="flex-1 overflow-y-auto space-y-4 pr-1">
      <div v-for="item in orderItems" :key="item.id" class="bg-white shadow-md rounded-lg p-4 flex gap-4 w-full">
        <div class="flex">
          <img :src="item.imageUrl ? item.imageUrl : importImage('default.jpg')" alt="menu image"
            class="w-20 h-20 object-cover rounded-lg " />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ item.boothName }}
          </h3>
          <p class="text-base text-gray-300">{{ item.menuName }}</p>
          <div class="flex justify-between gap-3">
            <div class="text-base">
              <p>{{ item.quantity }}x</p>
              <p>{{ item.remarks }}</p>
            </div>
            <p class="text-lg font-medium text-primary">
              Rp {{ formatPrice(item.subtotal ?? 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ringkasan & Tombol -->
    <div class="shrink-0 pt-6 space-y-4 max-w-md mx-auto sm:mx-0 w-full bg-primary rounded-lg p-4">
      <div class="text-sm text-white">
        <div class="flex justify-between font-bold text-white text-lg">
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
const orderId = ref<number>()
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const order = computed(() => orderStore.orderDetail);

const orderItems = computed(() => {
  return orderId.value && order.value?.orderItems
    ? order.value.orderItems
    : orderStore.orderItems;
});

const total = computed(() => {
  if (orderId.value && order.value?.totalPrice != null) {
    return order.value.totalPrice;
  }

  return orderItems.value?.reduce((sum, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return sum + price * quantity;
  }, 0) ?? 0;
});

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(() => {
  if (route.params?.orderId) {
    orderId.value = +route.params?.orderId
    getOrder()
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

const getOrder = async () => {
  if (orderId.value) {
    await orderStore.getOrderById(orderId.value)
  }
}

</script>
