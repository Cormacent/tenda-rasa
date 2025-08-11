<template>
  <section
    id="OrderStatus"
    class="relative flex justify-center items-start min-h-screen px-4 pt-16"
  >
    <!-- Container Putih -->
    <div class="bg-white/90 w-full max-w-xl rounded-xl shadow-lg p-6 z-10">
      <h2 class="text-xl font-bold text-primary mb-6 text-center">Rincian Pesanan</h2>

      <div v-for="item in items" :key="item.id" class="mb-4 border-b pb-4">
        <div class="flex justify-between items-start gap-4">
          <div class="flex-1">
            <h3 class="text-base font-semibold text-gray-800">{{ item.menu_name }}</h3>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
            <el-input
              v-model="item.note"
              placeholder="Catatan"
              size="small"
              class="mt-2 w-full"
              clearable
            />
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">{{ item.quantity }}x</p>
            <p class="text-base font-medium text-gray-900">Rp {{ item.price.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-2 text-sm text-gray-700 mt-6">
        <div class="flex justify-between">
          <span>Sub-Total</span>
          <span>Rp {{ subtotal.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between">
          <span>PPN 11%</span>
          <span>Rp {{ tax.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between font-bold text-primary text-base">
          <span>Total</span>
          <span>Rp {{ total.toLocaleString() }}</span>
        </div>
      </div>

      <el-button type="danger" size="large" class="w-full mt-8">
        Buat Pesanan
      </el-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface OrderItem {
  id: number
  menu_name: string
  description: string
  price: number
  quantity: number
  note?: string
}

const items = ref<OrderItem[]>([
  {
    id: 1,
    menu_name: 'Ayam Bakar',
    description: 'Pedas manis khas rumah',
    price: 28000,
    quantity: 1,
    note: ''
  },
  {
    id: 2,
    menu_name: 'Es Teh Manis',
    description: 'Dingin dan menyegarkan',
    price: 5000,
    quantity: 2,
    note: ''
  }
])

const subtotal = computed(() =>
  items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
)

const taxRate = 0.11
const tax = computed(() => Math.round(subtotal.value * taxRate))
const total = computed(() => subtotal.value + tax.value)
</script>

<style lang="scss" scoped src="./OrderStatus.scss" />