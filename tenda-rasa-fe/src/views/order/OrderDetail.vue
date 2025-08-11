<template>
  <section id="OrderStatus" class="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
    <h2 class="text-xl font-bold text-primary mb-6 text-center sm:text-left">Rincian Pesanan</h2>

    <!-- Daftar Item -->
    <div v-for="item in items" :key="item.id" class="mb-4 border-b pb-4">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div class="flex-1">
          <h3 class="text-base font-semibold text-gray-800">{{ item.menu_name }}</h3>
          <p class="text-sm text-gray-500">{{ item.description }}</p>
          <el-input
            v-model="item.note"
            placeholder="Masukkan Catatan (optional)"
            class="mt-2 w-full"
            size="small"
            clearable
          />
        </div>
        <div class="text-right sm:text-left">
          <p class="text-sm text-gray-600">{{ item.quantity }}x</p>
          <p class="text-base font-medium text-gray-900">Rp {{ item.price.toLocaleString() }}</p>
        </div>
      </div>
    </div>

    <!-- Ringkasan -->
    <div class="mt-6 space-y-2 text-sm text-gray-700 max-w-md mx-auto sm:mx-0">
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

    <!-- Tombol -->
    <div class="mt-8 max-w-md mx-auto sm:mx-0">
      <el-button type="danger" size="large" class="w-full">
        Buat Pesanan
      </el-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// Struktur item pesanan
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
    menu_name: 'Sate Khas Senayan',
    description: 'Sate Ayam Bumbu Kacang',
    price: 35000,
    quantity: 1,
    note: ''
  },
  {
    id: 2,
    menu_name: 'Nasi Goreng77',
    description: 'Nasi goreng spesial',
    price: 22000,
    quantity: 2,
    note: 'Catatan 2'
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