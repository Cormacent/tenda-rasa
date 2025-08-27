import { computed } from 'vue';
import BubbleOrderPayment from '../bubble-order-payment/BubbleOrderPayment.vue';
import { Intent } from '../../../../enums/intent';
import { Role } from '../../../../enums/role';
import BubbleMessage from '../bubble-message/BubbleMessage.vue';
import BubbleMenus from '../bubble-menus/BubbleMenus.vue';
import { formatDate } from '@/utils/helper';
import BubbleOrderStatus from '../bubble-order-status/BubbleOrderStatus.vue';
const props = defineProps();
const emit = defineEmits();
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
        props.chat.role === Role.USER ? 'bg-primary text-white' : 'bg-gray-100 text-black'
    ];
});
const bubbleComponent = computed(() => {
    switch (props.chat.intent) {
        case Intent.ORDER_STATUS:
            return BubbleOrderStatus;
        case Intent.ORDER_PAYMENT:
            return BubbleOrderPayment;
        case Intent.RECOMMENDATION:
            return BubbleMenus;
        default:
            return BubbleMessage;
    }
});
//----------------------------------------
// 🎯 Watchers
//----------------------------------------
//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    id: "BubbleContainer",
    ...{ class: "relative" },
    ...{ class: (__VLS_ctx.bubbleClass) },
});
const __VLS_0 = ((__VLS_ctx.bubbleComponent));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSelectMenu': {} },
    chat: (__VLS_ctx.chat),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSelectMenu': {} },
    chat: (__VLS_ctx.chat),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSelectMenu: (...[$event]) => {
        __VLS_ctx.emit('select-menu', $event);
    }
};
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-xs mt-2 text-right" },
});
(__VLS_ctx.formatDate(__VLS_ctx.chat?.createdAt ?? ''));
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formatDate: formatDate,
            emit: emit,
            bubbleClass: bubbleClass,
            bubbleComponent: bubbleComponent,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
