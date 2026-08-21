<template>
  <section id="BoothDetail" class="flex flex-col h-full">
    <div class="flex-shrink-0 z-10 p-5">
      <el-button @click="goToParent()" class="rounded-lg"
        style="background-color: var(--el-color-primary-light-3); border-color: var(--el-color-primary-light-3);">
        <icon-ep-arrow-left-bold class="text-primary" />
      </el-button>
    </div>
    <!-- Gambar -->
    <img :src="menuDetail.imageUrl || importImage('default.jpg')" :alt="menuDetail.menuName"
      class="w-full h-80 object-cover -mt-[5rem]" @error="console.error('Image not found:', menuDetail.imageUrl)" />

    <!-- Card Wrapper -->
    <div class="flex flex-col flex-1 bg-white rounded-t-2xl shadow-lg -mt-12 overflow-hidden">
      <!-- Scrollable Content -->
      <div class="overflow-y-auto px-4 pt-6 pb-4 flex-1 flex flex-col gap-3">
        <h2 class="text-xl font-bold text-primary">{{ menuDetail.boothName }}</h2>
        <h3 class="text-base font-semibold text-secondary">{{ menuDetail.menuName }}</h3>

        <div>
          <div class="flex items-center text-base font-medium text-gray-700">
            <icon-ep-clock class="mr-1" />
            <span>{{ menuDetail.estimatedMinutes }} Menit</span>
          </div>
          <div class="flex items-center text-base font-medium text-gray-700">
            <span>Sisa :</span> <span>{{ menuDetail.stock ?? 0 }}</span>
          </div>
        </div>

        <p class="text-gray-700 text-base font-medium">
          {{ menuDetail.description }}
        </p>

        <ul class="text-base font-medium text-gray-700 space-y-1">
          <li>🍽️ Cocok untuk {{ menuDetail.category === 'makanan' ? 'makan' : 'minum' }} siang atau malam</li>
          <li v-if="menuDetail.category === 'makanan'">🌶️ Pedas: {{ menuDetail.spicinessLevel }}/5</li>
        </ul>
      </div>

      <!-- Sticky CTA -->
      <div class="shrink-0 px-4 py-5 border-t">
        <div class="flex items-center gap-5 justify-center w-full" v-if="menuInOrderItemsCount > 0 && menuDetail.stock">
          <el-button size="small" @click="removeFromCart" :class="[
            'flex items-center px-3 py-2 rounded focus:outline-none',
            'bg-white text-primary border border-primary shadow-none',
            'hover:bg-white hover:text-primary hover:border-primary',
            'focus:bg-white focus:text-primary focus:border-primary',
            'active:bg-white active:text-primary active:border-primary'
          ]">
            <icon-ep-minus />
          </el-button>

          <span class="text-lg font-semibold">{{ menuInOrderItemsCount }}</span>

          <el-button size="small" :disabled="menuInOrderItemsCount >= (menuDetail.stock ?? 0)" @click="addToCart"
            :class="[
              'flex items-center px-3 py-2 rounded focus:outline-none',
              'bg-primary text-white border border-primary shadow-none',
              'hover:bg-primary hover:text-white hover:border-primary',
              'focus:bg-primary focus:text-white focus:border-primary',
              'active:bg-primary active:text-white active:border-primary'
            ]">
            <icon-ep-plus />
          </el-button>

          <router-link :to="{ name: 'checkout' }" class="ml-2">
            <el-button type="primary" size="small" :class="[
              'flex items-center gap-2 px-3 py-2 rounded focus:outline-none',
              'bg-primary text-white border border-primary shadow-none',
              'hover:bg-primary hover:text-white hover:border-primary',
              'focus:bg-primary focus:text-white focus:border-primary',
              'active:bg-primary active:text-white active:border-primary'
            ]">
              <icon-ep-shopping-cart class="text-white" />
            </el-button>
          </router-link>
        </div>
        <el-button v-else :class="[
          'w-full',
          'flex items-center gap-2 px-3 py-2 rounded focus:outline-none',
          'bg-primary text-white border border-primary shadow-none',
          'hover:bg-white hover:text-primary hover:border-primary',
          'focus:bg-white focus:text-primary focus:border-primary',
          'active:bg-white active:text-primary active:border-primary'
        ]" size="large" round @click="addToCart">
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
import { RouteRecordName, useRoute, useRouter } from 'vue-router'
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
const router = useRouter()

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
const goToParent = () => {
  const segments = route.path.split('/').filter(Boolean); // remove empty segments

  if (window.history.length > 1 || segments.length > 0) {
    router.back(); // go to previous history
  } else {
    router.replace({ name: 'explore-booths' as RouteRecordName }); // fallback
  }
};
</script>

<style lang="scss" scoped src="./BoothDetail.scss" />