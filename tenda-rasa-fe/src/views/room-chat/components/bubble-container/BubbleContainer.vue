<template>
    <section id="BubbleContainer" class="relative mb-4">
        <div v-if="[Intent.ORDER_PAYMENT, Intent.ORDER_STATUS].includes(intent)">
            <div :class="bubbleClass" class="mb-6">
                <!-- Dynamic Bubble Content -->
                <BubbleMessage :chat="{ message: { chat: chat.message?.chat } }" />
                <!-- Timestamp -->
                <p class="text-sm font-base mt-2 text-right">
                    {{ formatDate(chat?.createdAt ?? '') }}
                </p>
            </div>
            <div :class="bubbleClass" v-if="chat.message?.orders && chat.message?.orders?.length > 0">
                <!-- Dynamic Bubble Content -->
                <component :is="bubbleComponent" :chat="chat" @select-menu="emit('select-menu', $event)" />
                <!-- Timestamp -->
                <p class="text-sm font-base mt-2 text-right">
                    {{ formatDate(chat?.createdAt ?? '') }}
                </p>
            </div>
        </div>
        <div v-else :class="bubbleClass">
            <!-- Dynamic Bubble Content -->
            <component :is="bubbleComponent" :chat="chat" @select-menu="emit('select-menu', $event)" />
            <!-- Timestamp -->
            <p class="text-sm font-base mt-2 text-right">
                {{ formatDate(chat?.createdAt ?? '') }}
            </p>
        </div>
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
import type { IMenu } from '@/models/IMenu';
import { formatDate } from '@/utils/helper';
import BubbleOrderStatus from '../bubble-order-status/BubbleOrderStatus.vue';
import OrderDetail from '@/views/order/order-detail/OrderDetail.vue';

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
const intent = computed(() => props.chat.intent as Intent)
const bubbleClass = computed(() => {
    return [
        'p-4',
        'rounded-lg',
        'shadow-md',
        'border',
        'border-gray-200',
        'hover:shadow-lg',
        'transition-shadow',
        'duration-200',
        'cursor-pointer',
        'w-fit',
        props.chat.role === Role.USER ? 'bg-primary text-white' : 'bg-gray-100 text-black'
    ]
})
const bubbleComponent = computed(() => {
    switch (props.chat.intent) {
        case Intent.ORDER_STATUS:
            return BubbleOrderStatus
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

</script>
<style lang="scss" scoped></style>
