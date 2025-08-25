<template>
    <section id="OrderList" class="flex flex-col h-full container mx-auto px-4">
        <div class="absolute top-0 right-0 w-full h-full pointer-events-none -z-10" style="
    mask-image: linear-gradient(to bottom, transparent 0%, white 15%, white 100%);
    mask-mode: alpha;
    background-color: white;
  "></div>
        <!-- Header -->
        <div class="shrink-0 mb-4">
            <h1 class="text-2xl font-bold">Status Pesanan</h1>
        </div>

        <!-- Scrollable Order List -->
        <div class="flex-1 overflow-y-auto px-4 space-y-4 py-2">
            <router-link v-for="order in orderList" :key="order.id"
                class="bg-white shadow-md rounded-lg p-4 flex gap-4 w-full"
                :to="{ name: 'order-detail-by-id', params: { orderId: order.id } }">
                <div class="flex gap-2">
                    <div class="flex">
                        <img :src="importImage(`order-${order.status}.svg`)" alt="menu image"
                            class="w-20 h-20 object-cover rounded-lg" />
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-black">
                            ID Pesanan #{{ order.name }}-{{ order.id }}
                        </h3>
                        <p class="text-base text-gray-500">
                            {{
                                order.status === Status.PAID
                                    ? 'Restoran sedang menyiapkan pesananmu.'
                                    : 'Pesanan kamu telah dibatalkan.'
                            }}
                        </p>
                        <p class="text-base text-primary font-semibold">Cek Status Pesanan</p>
                    </div>
                </div>
            </router-link>
        </div>
    </section>
</template>


<script lang="ts" setup>
import { useOrderStore } from '@/store/order';
import { useUserStore } from '@/store/user';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { importImage } from '@/utils/helper';
import { Status } from '@/enums/status';



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
