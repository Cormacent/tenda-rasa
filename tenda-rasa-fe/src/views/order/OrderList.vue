<template>
    <section id="OrderList" class="flex flex-col h-full container mx-auto px-4">
        <div class="absolute top-0 right-0 w-full h-full pointer-events-none -z-10" style="
    mask-image: linear-gradient(to bottom, transparent 0%, white 15%, white 100%);
    mask-mode: alpha;
    background-color: white;
  "></div>
        <!-- Scrollable Order List -->
        <div class="flex-1 overflow-y-auto px-4 space-y-4 py-2">
            <router-link v-for="order in orderList" :key="order.id"
                class="bg-white shadow-md rounded-lg p-4 flex gap-4 w-full"
                :to="{ name: 'order-detail-by-id', params: { orderId: order.id } }">
                <div class="flex gap-4 items-center">
                    <div class="flex">
                        <img :src="importImage(`order-${order.status}.svg`)" alt="menu image"
                            class="w-20 h-20 object-cover rounded-lg" />
                    </div>
                    <div class="flex-1">
                        <p class="text-base font-semibold text-primary">
                            #{{ order.name }}-{{ order.id }}
                        </p>
                        <p class="text-base text-gray-700">
                            {{
                                order.status === Status.PAID
                                    ? 'Restoran sedang menyiapkan pesananmu.'
                                    : 'Pesanan kamu telah selesai.'
                            }}
                        </p>
                        <div class="flex gap-2 mt-2" v-if="order.orderItems">
                            <template v-for="(item, index) in order.orderItems.slice(0, 3)" :key="index">
                                <img :src="item.imageUrl || importImage('default.jpg')" :alt="item.menuName"
                                    class="w-10 h-10 object-cover rounded" />
                            </template>

                            <div v-if="order.orderItems.length > 3"
                                class="w-10 h-10 flex items-center justify-center rounded bg-gray-100 text-base font-medium text-gray-700">
                                +{{ order.orderItems.length - 3 }}
                            </div>
                        </div>

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
const getOrderDetail = async () => {
    if (userInfo.value.email) {
        await orderStore.getAllActiveOrdersByEmail(userInfo.value.email);
    }
}

</script>
<style lang="scss" scoped src="./OrderList.scss" />
