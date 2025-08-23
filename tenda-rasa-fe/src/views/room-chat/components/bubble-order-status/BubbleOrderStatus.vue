<template>
    <section id="BubbleOrderStatus" class="flex flex-col gap-4">
        <div class="-mt-[2rem]">
            <el-tag type="warning" size="small" v-if="order?.status == Status.PAID">Pesananmu sedang di
                siapkan!</el-tag>
            <el-tag type="success" size="small" v-if="order?.status == Status.COMPLETED">Pesananmu telah
                selesai!</el-tag>
        </div>
        <span class="text-lg font-semibold">#{{ order?.name }} - {{ order?.id }}</span>
        <div v-if="orderItems.length > 0">
            <div v-for="item in orderItems" :key="item.id" class="bg-white shadow-md rounded-lg p-2 flex gap-4 w-full">
                <div class="flex">
                    <img :src="item.imageUrl ? item.imageUrl : importImage('default.jpg')" alt="menu image"
                        class="w-20 h-20 object-cover rounded-lg " />
                </div>
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-800">
                        {{ item.boothName }}
                    </h3>
                    <p class="text-base text-gray-300">{{ item.menuName }}</p>
                    <div class="flex justify-between gap-3">
                        <div class="text-base">
                            <p>{{ item.quantity }}x</p>
                            <p>{{ item.remarks }}</p>
                        </div>
                        <p class="text-lg font-medium text-primary">
                            Rp {{ formatPrice(item.subtotal ?? 0) }}
                        </p>
                    </div>
                </div>
            </div>
            <router-link :to="{ name: 'order-list', }" class="text-xl text-primary text-center">
                <p>Lihat Semua Pesanan</p>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { IChatbot } from '@/models/IChatbot';
import { formatPrice } from '@/utils/helper';
import { computed } from 'vue';
import { Status } from '@/enums/status';
import { importImage } from '@/utils/helper';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const props = defineProps<{ chat: IChatbot }>()

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const order = computed(() => props.chat?.message?.orders?.[0] ?? null)
const orderItems = computed(() => order.value?.orderItems?.splice(0.2) ?? [])

const formattedDate = computed(() => {
    const d = new Date(order.value?.createdAt || Date.now())
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = String(d.getFullYear()).slice(-2)
    const hour = String(d.getHours()).padStart(2, '0')
    const minute = String(d.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} ${hour}:${minute}`
})



//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------


</script>
<style lang="scss" scoped></style>