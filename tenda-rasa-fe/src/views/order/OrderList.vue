<template>
    <section id="OrderList" class="relative h-[calc(100vh-7rem)] container mx-auto px-4">
        <h1 class="text-2xl font-bold">Status Pesanan</h1>

        <div class="absolute left-0 right-0 overflow-y-auto px-4  space-y-4" :style="{ top: '140px', bottom: '0' }">
            <router-link v-for="order in orderList" :key="order.id"
            class="flex flex-col gap-4"
                :to="{ name: 'order-detail-by-id', params: { orderId: order.id } }">
                <el-card shadow="hover">
                    <div class="text-sm text-gray-600">{{ order.id }}</div>
                    <div class="text-xs text-gray-400 mb-2">{{ order.createdAt }}</div>
                </el-card>
            </router-link>

        </div>

    </section>
</template>

<script lang="ts" setup>
import { useOrderStore } from '@/store/order';
import { useUserStore } from '@/store/user';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';



//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const orderStore = useOrderStore()
const route = useRoute()
const userStore = useUserStore()
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const userInfo = computed(() => userStore.userInfo)
const orderList = computed(() => orderStore.orderList)
//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(() => {
    getOrderDetail()
})

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const getOrderDetail = () => {
    if (userInfo.value.email) {
        orderStore.getAllOrdersByEmail(userInfo.value.email)
    }
}

</script>
<style lang="scss" scoped src="./OrderList.scss" />
