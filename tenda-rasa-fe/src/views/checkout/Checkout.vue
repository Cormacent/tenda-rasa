<template>
  <section id="Checkout" class="flex flex-col h-full container mx-auto px-4">
    <div class="absolute top-0 right-0 w-full h-full pointer-events-none -z-10" style="
    mask-image: linear-gradient(to bottom left, transparent 0%, white 45%, white 100%);
    mask-mode: alpha;
    background-color: white;
  "></div>
    <!-- Scrollable Daftar Item -->
    <div class="flex-1 overflow-y-auto space-y-4">
      <div v-for="item in orderItems" :key="item.id" class="bg-white shadow-md rounded-lg p-4 flex gap-4 w-full">
        <div class="flex gap-2 w-full">
          <div class="flex">
            <img :src="item.imageUrl ? item.imageUrl : importImage('default.jpg')" alt="menu image"
              class="w-20 h-20 object-cover rounded-lg" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-700">
              {{ item.boothName }}
            </h3>
            <p class="text-base text-gray-700">{{ item.menuName }}</p>
            <div class="flex items-center gap-3 justify-start w-full">
              <el-button size="small" @click="removeFromCart(item)" :class="[
                'flex items-center px-3 py-2 rounded focus:outline-none',
                'bg-white text-primary border border-primary shadow-none',
                'hover:bg-white hover:text-primary hover:border-primary',
                'focus:bg-white focus:text-primary focus:border-primary',
                'active:bg-white active:text-primary active:border-primary'
              ]">

                <icon-ep-minus />
              </el-button>

              <span class="text-lg font-semibold">{{ item.quantity }}</span>

              <el-button size="small" :disabled="isMaxQuantity(item)" @click="addToCart(item)" :class="[
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none',
                'bg-primary text-white border border-primary shadow-none',
                'hover:bg-primary hover:text-white hover:border-primary',
                'focus:bg-primary focus:text-white focus:border-primary',
                'active:bg-primary active:text-white active:border-primary'
              ]">
                <icon-ep-plus />
              </el-button>

            </div>
            <p class="text-lg font-medium text-primary text-end">
              Rp {{ formatPrice(item.price ?? 0) }}
            </p>

            <el-input v-model="item.remarks" placeholder="Masukkan Catatan (optional)"
              class="mt-2 w-full text-base font-medium text-primary" size="small" clearable />
          </div>
        </div>
      </div>
    </div>

    <!-- Ringkasan & Tombol -->
    <div class="shrink-0 py-4 border-t bg-white space-y-4" v-if="total > 0">
      <div class=" ">
        <div class="flex justify-between text-primary text-base font-bold text-gray-700">
          <span>Total</span>
          <span>Rp {{ formatPrice(total ?? 0) }}</span>
        </div>
      </div>


      <el-button :class="[
        'w-full',
        'flex items-center gap-2 px-3 py-2 rounded focus:outline-none',
        'bg-primary text-white border border-primary shadow-none',
        'hover:bg-white hover:text-primary hover:border-primary',
        'focus:bg-white focus:text-primary focus:border-primary',
        'active:bg-white active:text-primary active:border-primary'
      ]" size="large" round @click="createOrder">
        <span class="text-base font-base">
          Buat Pesanan
        </span>
      </el-button>
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

<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  @apply bg-white rounded;
  @apply bg-white rounded shadow-[0_0_0_1px_var(--el-color-primary)];
}

:deep(.el-input__inner::placeholder) {
  color: var(--el-color-primary);
  opacity: 0.6;
}

:deep(.el-input__inner) {
  color: var(--el-color-primary);
  opacity: 1;
}

:deep(.el-input__prefix-inner) {
  @apply text-primary;
}
</style>