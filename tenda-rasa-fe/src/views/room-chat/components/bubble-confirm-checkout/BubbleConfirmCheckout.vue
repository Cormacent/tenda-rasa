<template>
    <section id="BubbleConfirmCheckout" class="max-w-md mx-auto">
        <p class="text-base font-base mb-3">
            {{ message }}
        </p>

        <div class="flex gap-2">
            <el-button type="primary" size="small" class="flex-1 rounded-full" @click="onConfirm">
                ✅ Ya, Checkout
            </el-button>
            <el-button size="small" class="flex-1 rounded-full" plain @click="onCancel">
                + Tambah Item
            </el-button>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { IChatbot } from '@/models/IChatbot';
import { computed } from 'vue';

const props = defineProps<{ chat: IChatbot }>();
const emit = defineEmits<{
    (e: 'confirm-checkout'): void
    (e: 'add-more'): void
}>();

const message = computed(() =>
    props.chat?.message?.chat ??
    'Yuk checkout! Pastikan pesanan kamu sudah benar ya 😊'
);

function onConfirm() {
    emit('confirm-checkout');
}

function onCancel() {
    emit('add-more');
}
</script>
