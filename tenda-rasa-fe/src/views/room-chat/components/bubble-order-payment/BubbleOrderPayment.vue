<template>
    <section id="BubbleOrderPayment" class="flex flex-col gap-4 w-full max-w-full min-w-[10rem]">
        <!-- Header -->
        <div class="flex justify-between items-center text-base font-medium">
            <div class="flex flex-col">
                <span class="font-base">ID Pesanan</span>
                <span class="font-semibold">#{{ order?.name }}-{{ order?.id }}</span>
            </div>
            <div class="flex flex-col text-end">
                <span class="font-base">Tanggal</span>
                <span class="font-semibold" v-if="order?.createdAt">{{ formatDate(order?.createdAt) }}</span>
            </div>
        </div>

        <!-- QR Code -->
        <div class="flex flex-col items-center">
            <p class="text-center font-semibold">QR Code</p>
            <img :src="order?.qrcode" alt="QR Code" class="w-[15rem] h-auto object-contain rounded-md shadow" />
        </div>

        <!-- Status -->
        <div v-if="order?.status" class="font-bold">
            <div class="flex justify-between items-center " v-if="order?.status === Status.PENDING">
                <el-tag type="warning" size="small">Menunggu Pembayaran</el-tag>
                <span>{{ formattedCountdown }}</span>
            </div>
            <div class="flex justify-center items-center "
                v-if="[Status.PAID, Status.COMPLETED].includes(order?.status as Status)">
                <el-tag type="success" size="small">Pembayaran Berhasil</el-tag>
            </div>
            <div class="flex justify-center items-center " v-if="order?.status === Status.CANCELLED">
                <el-tag type="danger" size="small">Pembayaran Dibatalkan</el-tag>
            </div>

        </div>

        <!-- Total -->
        <div class="flex justify-between items-center border-t pt-4">
            <span class="text-base font-medium text-gray-700">Total Pesanan</span>
            <span class="text-xl font-bold text-gray-700">
                Rp {{ formatPrice(order?.totalPrice ?? 0) }}
            </span>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { IChatbot } from '@/models/IChatbot';
import { formatPrice, formatDate } from '@/utils/helper';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { Status } from '@/enums/status';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const props = defineProps<{ chat: IChatbot }>()
const countdown = ref(0); // dalam detik
const intervalId = ref<number | null>(null);


//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const order = computed(() => props.chat?.message?.orders?.[0] ?? null)

const targetTimestamp = computed(() => {
    if (!order.value || !order.value?.createdAt || !order.value?.status) return null;

    const created = new Date(order.value.createdAt).getTime();
    const durationMinutes =
        order.value.status === Status.PENDING ? 1 :
            order.value.status === Status.PAID ? 1 : 0;

    return created + durationMinutes * 60 * 1000;
});

// Format ke MM:SS
const formattedCountdown = computed(() => {
    const minutes = Math.floor(countdown.value / 60).toString().padStart(2, '0');
    const seconds = (countdown.value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
});



//----------------------------------------
// 🎯 Watchers
//----------------------------------------
watch(countdown, (val) => {
    if (val === 0) {
        console.log('⏰ Countdown selesai');
        // emit('expired') atau trigger logic lain
    }
});

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(() => {
    updateCountdown();
    intervalId.value = window.setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    if (intervalId.value) clearInterval(intervalId.value);
});

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------

const updateCountdown = () => {
    if (!targetTimestamp.value) return;

    const now = Date.now();
    const remainingMs = targetTimestamp.value - now;
    countdown.value = Math.max(Math.floor(remainingMs / 1000), 0);
};

</script>