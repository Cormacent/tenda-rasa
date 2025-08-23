<template>
  <section id="Checkout" class="flex flex-col h-full bg-gradient-to-b from-white/20 to-white container mx-auto px-4">
    <!-- Scrollable Daftar Item -->
    <div class="flex-1 overflow-y-auto space-y-4">
      <div v-for="item in orderItems" :key="item.id" class="bg-white shadow-md rounded-lg p-4 flex gap-4 w-full">
        <div class="flex gap-2">
          <div class="flex">
            <img :src="item.imageUrl ? item.imageUrl : importImage('default.jpg')" alt="menu image"
              class="w-20 h-20 object-cover rounded-lg" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ item.boothName }}
            </h3>
            <p class="text-base text-gray-300">{{ item.menuName }}</p>
            <div class="flex justify-between gap-3">
              <p class="text-lg font-medium text-primary">
                Rp {{ formatPrice(item.price ?? 0) }}
              </p>
              <div class="flex justify-center">
                <div class="flex items-center gap-5 justify-center w-full">
                  <el-button
                    style="background-color: var(--el-color-primary-light-3); border-color: var(--el-color-primary);"
                    size="small" @click="removeFromCart(item)" class="rounded-lg text-primary">
                    <icon-ep-minus />
                  </el-button>

                  <span class="text-lg font-semibold">{{ item.quantity }}</span>

                  <el-button style="background-color: var(--el-color-primary); border-color: var(--el-color-primary);"
                    size="small" :disabled="isMaxQuantity(item)" @click="addToCart(item)" class="rounded-lg text-white">
                    <icon-ep-plus />
                  </el-button>

                </div>
              </div>
            </div>
            <el-input v-model="item.remarks" placeholder="Masukkan Catatan (optional)" class="mt-2 w-full text-sm"
              size="small" clearable />
          </div>
        </div>
      </div>
    </div>

    <!-- Ringkasan & Tombol -->
    <div class="shrink-0 py-4 border-t bg-white space-y-4" v-if="total > 0">
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
import { computed, onMounted } from 'vue'
import { useOrderStore } from '@/store/order'
import { formatPrice } from '@/utils/helper'
import { useRouter } from 'vue-router'
import { importImage } from '@/utils/helper';
import { IMenu } from '@/models/IMenu'
import { IOrderItem } from '@/models/IOrderItem'
import { useMenuStore } from '@/store/menu'

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const orderStore = useOrderStore()
const router = useRouter()
const menuStore = useMenuStore()
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const orderItems = computed(() => orderStore.orderItems)
const total = computed(() => orderItems.value.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0))
const menuList = computed(() => menuStore.menuList || [])

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(async () => {
  await menuStore.getAllMenus()
})
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const foundMenu = (menuId?: number): IMenu | undefined => {
  if (typeof menuId !== 'number') return undefined
  return menuList.value.find(menu => menu.id === menuId)
}

const isMaxQuantity = (orderItem: IOrderItem): boolean => {
  const menu = foundMenu(orderItem.menuId)
  const max = menu?.stock ?? 0
  const qty = orderItem.quantity ?? 0
  return qty >= max
}

const addToCart = (orderItem: IOrderItem) => {
  const menu = foundMenu(orderItem.menuId)
  if (menu) {
    orderStore.addToCheckoutList(menu)
  }
}

const removeFromCart = (orderItem: IOrderItem) => {
  const menu = foundMenu(orderItem.menuId)
  if (menu) {
    orderStore.removeFromCheckoutList(menu)
  }
}

const createOrder = async () => {
  router.push({ name: 'order-detail' })
}


</script>
