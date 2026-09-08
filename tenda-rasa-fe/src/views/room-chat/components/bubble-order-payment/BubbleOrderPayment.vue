<template>
    <section id="BubbleOrderPayment" class="flex flex-col gap-4 w-full max-w-full min-w-[10rem]">
        <!-- Header -->
        <div class="flex justify-between items-center text-base font-semibold">
            <div class="flex flex-col">
                <span class="font-semibold text-gray-800">ID Pesanan</span>
                <span class="font-bold text-gray-900">#{{ order?.name }}-{{ order?.id }}</span>
            </div>
            <div class="flex flex-col text-end">
                <span class="font-semibold text-gray-800">Tanggal</span>
                <span class="font-bold text-gray-900" v-if="order?.createdAt">{{ formatDate(order?.createdAt) }}</span>
            </div>
        </div>

        <!-- QR Code -->
        <div class="flex flex-col items-center">
            <p class="text-center font-bold text-gray-900">QR Code</p>
            <img :src="order?.qrcode" alt="QR Code" class="w-[15rem] h-auto object-contain rounded-md shadow cursor-pointer hover:opacity-80 transition-opacity"
              @click="onQrClick" title="Klik untuk info pembayaran" />
        </div>

        <!-- Status -->
        <div v-if="order?.status" class="font-bold">
            <div class="flex justify-between items-center" v-if="order?.status === Status.PENDING">
                <el-tag v-if="!isExpired" type="warning" size="small">Menunggu Pembayaran</el-tag>
                <el-tag v-else type="danger" size="small">Waktu Habis</el-tag>
                <span class="font-bold text-gray-900">{{ isExpired ? '—' : formattedCountdown }}</span>
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
            <span class="text-base font-bold text-gray-900">Total Pesanan</span>
            <span class="text-xl font-bold text-gray-900">
                Rp {{ formatPrice(order?.totalPrice ?? 0) }}
            </span>
        </div>

        <!-- Order Items List -->
        <div v-if="displayedItems.length > 0" class="border-t pt-3 space-y-2">
            <p class="text-sm font-bold text-gray-900">Rincian Pesanan:</p>
            <div v-for="item in displayedItems" :key="item.id" class="flex justify-between text-sm">
                <span class="text-gray-800 font-semibold">{{ item.quantity }}x {{ item.menuName }}</span>
                <span class="text-gray-900 font-bold">Rp {{ formatPrice(item.subtotal ?? 0) }}</span>
            </div>

            <!-- Collapsed indicator -->
            <div v-if="hasMoreItems" class="text-center">
                <button @click="showAll = !showAll"
                    class="text-sm text-primary font-semibold hover:underline">
                    {{ showAll ? 'Tutup ↑' : `Lihat semua pesanan (+${remainingItems})` }}
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type { IChatbot } from '@/models/IChatbot';
import { formatPrice, formatDate } from '@/utils/helper';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { Status } from '@/enums/status';
import { ElMessage } from 'element-plus';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const props = defineProps<{ chat: IChatbot }>()
const countdown = ref(0); // dalam detik
const intervalId = ref<number | null>(null);
const showAll = ref(false);


//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const order = computed(() => props.chat?.message?.orders?.[0] ?? null)
const allItems = computed(() => order.value?.orderItems ?? [])
const DISPLAY_LIMIT = 3;
const hasMoreItems = computed(() => allItems.value.length > DISPLAY_LIMIT);
const remainingItems = computed(() => allItems.value.length - DISPLAY_LIMIT);
const displayedItems = computed(() =>
    showAll.value ? allItems.value : allItems.value.slice(0, DISPLAY_LIMIT)
);

const targetTimestamp = computed(() => {
    if (!order.value || !order.value?.createdAt || !order.value?.status) return null;

    const created = new Date(order.value.createdAt).getTime();
    const durationMinutes =
        order.value.status === Status.PENDING ? 10 :
            order.value.status === Status.PAID ? 10 : 0;

    return created + durationMinutes * 60 * 1000;
});

const isExpired = computed(() => countdown.value === 0 && order.value?.status === Status.PENDING);

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
    if (val === 0 && order.value?.status === Status.PENDING) {
        if (intervalId.value) clearInterval(intervalId.value);
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

const onQrClick = () => {
    ElMessage({
        message: 'Silakan scan QRIS menggunakan aplikasi bank/ewallet Anda. Halaman akan otomatis memperbarui status setelah pembayaran berhasil.',
        type: 'info',
        duration: 5000,
    });
};

</script>