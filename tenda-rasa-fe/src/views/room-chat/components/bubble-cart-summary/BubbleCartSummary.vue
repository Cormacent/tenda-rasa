<template>
    <section id="BubbleCartSummary" class="max-w-md mx-auto">
        <p class="text-base font-base mb-3">
            {{ message }}
        </p>

        <!-- Cart items list -->
        <div v-if="cart && cart.length" class="space-y-2 mb-3">
            <div v-for="(item, idx) in cart" :key="idx"
                class="flex justify-between items-center bg-white rounded-lg px-3 py-2 border border-gray-100">
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-800">{{ item.menuName }}</span>
                    <span class="text-xs text-gray-500">{{ item.quantity }}x · Rp {{ formatPrice(item.price ?? 0) }}</span>
                </div>
                <span class="text-sm font-semibold text-primary">Rp {{ formatPrice(item.subtotal ?? 0) }}</span>
            </div>
        </div>

        <!-- Total -->
        <div v-if="totalPrice" class="flex justify-between items-center mb-3 px-3 py-2 bg-primary/10 rounded-lg">
            <span class="text-sm font-semibold text-gray-700">Total</span>
            <span class="text-base font-bold text-primary">Rp {{ formatPrice(totalPrice) }}</span>
        </div>

        <!-- Action button -->
        <el-button type="primary" size="small" class="w-full rounded-full" @click="onCheckout">
            Checkout Sekarang →
        </el-button>
    </section>
</template>

<script lang="ts" setup>
import { IChatbot } from '@/models/IChatbot';
import { IOrderItem } from '@/models/IOrderItem';
import { formatPrice } from '@/utils/helper';
import { computed } from 'vue';

const props = defineProps<{ chat: IChatbot }>();
const emit = defineEmits<{
    (e: 'request-confirm'): void
}>();

const message = computed(() => props.chat?.message?.chat ?? 'Ringkasan Pesanan');
const cart = computed<IOrderItem[]>(() => props.chat?.message?.cart ?? []);
const totalPrice = computed(() => props.chat?.message?.totalPrice ?? 0);

function onCheckout() {
    emit('request-confirm');
}
</script>
