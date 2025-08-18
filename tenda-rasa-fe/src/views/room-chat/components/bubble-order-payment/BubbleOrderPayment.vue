<template>
    <section id="BubbleOrderPayment">
        <div class="flex justify-between items-center">
            <div>
                <h5 class="  font-semibold text-gray-800">ID Pesanan</h5>
                <p class="text-sm text-gray-600">#{{ order?.name }}-{{ order?.id }}</p>
            </div>
            <div>
                <h5 class=" text-right font-semibold text-gray-800">Tanggal</h5>
                <p class="text-sm text-gray-600">{{ formattedDate }}</p>
            </div>
        </div>

        <div class="flex flex-col justify-center align-center">
            <p class="text-center ">QR Code</p>
            <img :src="order?.qrcode" alt="QR Code" class="w-full h-auto object-contain rounded-md shadow" />
        </div>
        <div class="mt-4">
            <div class="flex justify-between align-center mt-4 " v-if="order?.status == Status.PENDING">
                <el-tag type="warning" size="small">Menunggu Pembayaran</el-tag>
                <span>00:59</span>
            </div>
            <div class="flex justify-center align-center mt-4 " v-if="order?.status == Status.PAID">
                <el-tag type="success" size="small">Pembayaran Berhasil</el-tag>
            </div>
            <div class="flex justify-center align-center mt-4 " v-if="order?.status == Status.CANCELLED">
                <el-tag type="danger" size="small">Pembayaran Dibatalkan</el-tag>
            </div>
        </div>


        <div class="flex justify-between items-center border-t pt-4">
            <span class="text-sm text-gray-600">Total Pesanan</span>
            <span class="text-lg font-bold text-gray-800">Rp {{ formatPrice(order?.totalPrice ?? 0) }}</span>
        </div>

    </section>
</template>

<script lang="ts" setup>
import { IChatbot } from '@/models/IChatbot';
import { formatPrice } from '@/utils/helper';
import { computed } from 'vue';
import { Status } from '@/enums/status';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const props = defineProps<{ chat: IChatbot }>()

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const order = computed(() => props.chat?.message?.orders?.[0] ?? null)

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
<style lang="scss" scoped>
#BubbleOrderPayment{
    width: 50vw;
}
</style>