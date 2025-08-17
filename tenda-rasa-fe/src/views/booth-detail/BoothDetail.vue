<template>
  <section id="BoothDetail" class="relative min-h-screen  ite overflow-hidden">
    <!-- Content -->
    <div class="relative z-10 max-w-2xl mx-auto px-6 py-10 bg-white/90 rounded-xl shadow-md">
      <!-- Header -->
      <h2 class="text-2xl font-bold text-primary mb-4">{{ menuDetail.boothName }}</h2>
      <h2 class="text-xl font-bold text-secondary mb-4">{{ menuDetail.menuName }}</h2>

      <!-- Menu Image -->
      <img :src="menuDetail.imageUrl ? menuDetail.imageUrl : importImage('default.jpg')" :alt="menuDetail.menuName"
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
      <div class="flex flex-col items-center">
        <!-- Quantity Control -->
        <div class="flex items-center gap-5" v-if="menuInOrderItemsCount > 0">
          <div class="flex items-center gap-2">
            <el-button circle size="small" @click="removeFromCart" class="border border-primary text-primary">
              <icon-ep-minus />
            </el-button>

            <span class="text-lg font-semibold">{{ menuInOrderItemsCount }}</span>

            <el-button circle size="small" @click="addToCart" class="border border-primary text-primary">
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
        <el-button v-else type="danger" size="large" round @click="addToCart" class="px-6">
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