<template>
    <section id="BubbleOrderPayment">
        <div class="flex justify-between items-center">
            <div>
                <h5 class="  font-semibold text-gray-800">ID Pesanan</h5>
                <p class="text-sm text-gray-600">#{{ order?.id }}</p>
            </div>
            <div>
                <h5 class=" text-right font-semibold text-gray-800">Tanggal</h5>
                <p class="text-sm text-gray-600">{{ formattedDate }}</p>
            </div>
        </div>

        <div class="flex justify-between text-sm text-gray-600">

        </div>


        <div class="flex flex-col justify-center">
            <p class="text-center ">QR Code</p>
            <img :src="order?.qrcode" alt="QR Code" class="w-40 h-auto object-contain rounded-md shadow" />
        </div>
        <div class="flex justify-center align-center mt-4">
            <el-tag type="warning" size="small" v-if="order?.status == Status.PENDING">Menunggu Pembayaran</el-tag>
            <el-tag type="success" size="small" v-if="order?.status == Status.PAID">Pembayaran Berhasil</el-tag>
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
<style lang="scss" scoped src="./BubbleOrderPayment.scss" />
