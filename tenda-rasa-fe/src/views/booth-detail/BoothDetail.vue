<template>
  <section id="BoothDetail"
    class="relative bg-gradient-to-b from-white/20 via-white/60 to-white h-[calc(100vh-7rem)] container mx-auto px-4">
    <!-- Content -->
    <!-- Header -->
    <h2 class="text-2xl font-bold text-primary ">{{ menuDetail.boothName }}</h2>
    <h2 class="text-xl font-bold text-secondary mb-4">{{ menuDetail.menuName }}</h2>

    <!-- Menu Image -->
    <img :src="menuDetail.imageUrl ? menuDetail.imageUrl : importImage('default.jpg')" :alt="menuDetail.menuName"
      class="w-full h-60 object-cover rounded-lg mb-4"
      @error="console.error('Image not found:', menuDetail.imageUrl)" />

    <div class="absolute left-0 right-0 overflow-y-auto px-4  gap-4" :style="{ top: '140px', bottom: '5px' }">
      <!-- Description -->
      <p class="text-gray-700 mb-4">
        {{ menuDetail.description }} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo corrupti cum
        impedit ab? Ad necessitatibus architecto veritatis, enim porro eligendi repudiandae quas cum, dicta totam
        nostrum praesentium accusamus error asperiores.
      </p>

      <!-- Details List -->
      <ul class="text-sm text-gray-600 space-y-1 mb-6">
        <li>⏱️ Estimasi: {{ menuDetail.estimatedMinutes }} menit</li>
        <li>🍽️ Cocok untuk {{ menuDetail.category == 'makanan' ? 'makan' : 'minum' }} siang atau malam</li>
        <li v-if="menuDetail.category == 'makanan'">🌶️ Pedas: {{ menuDetail.spicinessLevel }}/5</li>
      </ul>

    </div>

    <!-- CTA Button -->
    <div class="absolute bottom-0 left-0 right-0 px-4 py-2 border-t flex items-center justify-center">
      <div class="flex flex-col items-center w-full">
        <!-- Quantity Control -->
        <div class="w-full flex justify-center" v-if="menuInOrderItemsCount > 0 && menuDetail.stock">
          <div class="flex items-center gap-5 justify-center w-full">
            <el-button circle size="small" @click="removeFromCart" class="border border-primary text-primary">
              <icon-ep-minus />
            </el-button>

            <span class="text-lg font-semibold">{{ menuInOrderItemsCount }}</span>

            <el-button circle size="small" :disabled="menuInOrderItemsCount >= menuDetail.stock" @click="addToCart"
              class="border border-primary text-primary">
              <icon-ep-plus />
            </el-button>
            <router-link :to="{ name: 'checkout' }" class="ml-2">
              <el-button type="primary" circle size="small">
                <icon-ep-shopping-cart class="text-white" />
              </el-button>
            </router-link>
          </div>
        </div>

        <!-- Main Add to Cart Button -->
        <el-button class="w-full" v-else type="danger" size="large" round @click="addToCart">
          Masukkan ke Keranjang
        </el-button>
      </div>
    </div>
    <ModalUserInfo v-model:visible="visibleModal" @submit="addToCart" />
  </section>
</template>

<script lang="ts" setup>
import { importImage } from '@/utils/helper'
import { useMenuStore } from '@/store/menu'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/store/order'
import ModalUserInfo from '@/components/modal-user-info/ModalUserInfo.vue'
import { useUserStore } from '@/store/user'

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const menuStore = useMenuStore()
const menuId = ref<string>()
const route = useRoute()
const orderStore = useOrderStore()
const userStore = useUserStore()

const visibleModal = ref<boolean>(false)

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const menuDetail = computed(() => menuStore.menuDetail || {})

const menuInOrderItemsCount = computed(() => {
  return orderStore.orderItems.find(item => item.menuId === menuDetail.value.id)?.quantity || 0
})

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
const addToCart = () => {
  if (!menuDetail.value.id) return
  if (!userStore.userInfo || userStore.userInfo.name === '' || userStore.userInfo.email === '') {
    visibleModal.value = true
    return
  }
  orderStore.addToCheckoutList(menuDetail.value)
}

const removeFromCart = () => {
  if (!menuDetail.value.id) return
  orderStore.removeFromCheckoutList(menuDetail.value)
}
</script>

<style lang="scss" scoped src="./BoothDetail.scss" />