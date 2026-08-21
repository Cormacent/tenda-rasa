<template>
    <section id="BubbleOrderStatus" class="flex flex-col gap-2 pt-5">
        <div class="-mt-[3rem] -ml-[1rem]" v-if="order?.status">
            <div v-if="order?.status == Status.PAID">
                <span class="bg-warning text-base font-medium px-2 py-1 rounded text-white">
                    Pesananmu sedang di
                    siapkan!
                </span>
            </div>
            <div v-else-if="order?.status == Status.COMPLETED">
                <span class="bg-success text-base font-medium px-2 py-1 rounded text-white">
                    Pesananmu telah
                    selesai!
                </span>
            </div>
            <div v-else-if="order?.status == Status.CANCELLED">
                <span class="bg-danger text-base font-medium px-2 py-1 rounded text-white">
                    Pesananmu dibatalkan!
                </span>
            </div>
        </div>
        <div class="flex justify-between items-center text-base font-medium">
            <span>ID Pesanan</span>
            <span class="font-semibold">#{{ order?.name }}-{{ order?.id }}</span>
        </div>
        <div class="text-base text-center font-semibold w-100" v-if="countdown > 0">
            <el-tag type="danger" class="text-info text-primary">
                <span class="px-5">Estimated {{ formattedCountdown }}</span>
            </el-tag>
        </div>
        <div v-if="order?.orderItems && order?.orderItems.length > 0">
            <div v-for="item in order.orderItems" :key="item.id" class="p-2 flex justify-between gap-2 w-full">
                <div class="flex">
                    <img :src="item.imageUrl ? item.imageUrl : importImage('default.jpg')" alt="menu image"
                        class="w-20 h-20 object-cover rounded-lg " />
                </div>

                <div class="flex-1 bg-white rounded-lg p-2">
                    <h3 class="text-base font-semibold text-gray-700">
                        {{ item.boothName }}
                    </h3>
                    <p class="text-base font-medium text-gray-700">{{ item.menuName }}</p>
                    <div class="flex justify-between gap-3">
                        <div class="text-base font-medium">
                            <p>{{ item.quantity }}x</p>
                            <p>{{ item.remarks }}</p>
                        </div>
                        <p class="text-base font-medium text-primary">
                            Rp {{ formatPrice(item.subtotal ?? 0) }}
                        </p>
                    </div>
                </div>
            </div>

            <router-link :to="{ name: 'order-list', }" class="text-base text-primary text-center font-semibold">
                <p>Lihat Semua Pesanan</p>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { IChatbot } from '@/models/IChatbot';
import { formatPrice } from '@/utils/helper';
import { computed, onMounted, ref, watch } from 'vue';
import { Status } from '@/enums/status';
import { importImage } from '@/utils/helper';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const props = defineProps<{ chat: IChatbot }>()
const countdown = ref(0);
const intervalId = ref<number | null>(null);


//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const order = computed(() => props.chat?.message?.orders?.[props.chat?.message?.orders?.length - 1] ?? null)
// Format ke MM:SS
const formattedCountdown = computed(() => {
    const minutes = Math.floor(countdown.value / 60).toString().padStart(2, '0');
    const seconds = (countdown.value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
});
const targetTimestamp = computed(() => {
    if (!order.value || !order.value?.createdAt || !order.value?.status) return null;
    const created = new Date(order.value.createdAt).getTime();
    const durationMinutes =
        order.value.status === Status.PENDING ? 1 :
            order.value.status === Status.PAID ? 1 : 0;

    return created + durationMinutes * 60 * 1000;
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
<style lang="scss" scoped></style>