<template>
    <section id="BubbleContainer" class="relative" style="max-width: 70vw;" :class="bubbleClass">
        <!-- Dynamic Bubble Content -->
        <component :is="bubbleComponent" :chat="chat" @select-menu="emit('select-menu', $event)" />

        <!-- Timestamp -->
        <p class="text-xs mt-2 text-right">
            {{ formatDate(chat?.createdAt ?? '') }}
        </p>
    </section>
</template>

<script lang="ts" setup>
import { IChatbot } from '@/models/IChatbot'
import { computed } from 'vue';
import BubbleOrderPayment from '../bubble-order-payment/BubbleOrderPayment.vue';

import { Intent } from '../../../../enums/intent';
import { Role } from '../../../../enums/role';
import BubbleMessage from '../bubble-message/BubbleMessage.vue';
import BubbleMenus from '../bubble-menus/BubbleMenus.vue';
import { IMenu } from '@/models/IMenu';

const props = defineProps<{ chat: IChatbot }>()
const emit = defineEmits<{
    (e: 'select-menu', menu: IMenu): void
}>()
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const bubbleClass = computed(() => {
    return [
        'mb-4',
        'p-4',
        'rounded-lg',
        'shadow-md',
        'border',
        'border-gray-200',
        'hover:shadow-lg',
        'transition-shadow',
        'duration-200',
        'cursor-pointer',
        props.chat.role === Role.USER ? 'bg-primary text-white' : 'bg-white text-black  '
    ]
})
const bubbleComponent = computed(() => {
    switch (props.chat.intent) {
        // case Intent.ORDER_STATUS:
        //     return 'OrderBubble'
        case Intent.ORDER_PAYMENT:
            return BubbleOrderPayment
        case Intent.RECOMMENDATION:
            return BubbleMenus
        default:
            return BubbleMessage
    }
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

function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
} 
</script>
