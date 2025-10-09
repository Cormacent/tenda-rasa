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
const intent = computed(() => props.chat.intent);
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
    ...{ class: "relative mb-4" },
});
if ([__VLS_ctx.Intent.ORDER_PAYMENT, __VLS_ctx.Intent.ORDER_STATUS].includes(__VLS_ctx.intent)) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (__VLS_ctx.bubbleClass) },
        ...{ class: "mb-6" },
    });
    /** @type {[typeof BubbleMessage, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BubbleMessage, new BubbleMessage({
        chat: ({ message: { chat: __VLS_ctx.chat.message?.chat } }),
    }));
    const __VLS_1 = __VLS_0({
        chat: ({ message: { chat: __VLS_ctx.chat.message?.chat } }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm font-base mt-2 text-right" },
    });
    (__VLS_ctx.formatDate(__VLS_ctx.chat?.createdAt ?? ''));
    if (__VLS_ctx.chat.message?.orders && __VLS_ctx.chat.message?.orders?.length > 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: (__VLS_ctx.bubbleClass) },
        });
        const __VLS_3 = ((__VLS_ctx.bubbleComponent));
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
            ...{ 'onSelectMenu': {} },
            chat: (__VLS_ctx.chat),
        }));
        const __VLS_5 = __VLS_4({
            ...{ 'onSelectMenu': {} },
            chat: (__VLS_ctx.chat),
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
        let __VLS_7;
        let __VLS_8;
        let __VLS_9;
        const __VLS_10 = {
            onSelectMenu: (...[$event]) => {
                if (!([__VLS_ctx.Intent.ORDER_PAYMENT, __VLS_ctx.Intent.ORDER_STATUS].includes(__VLS_ctx.intent)))
                    return;
                if (!(__VLS_ctx.chat.message?.orders && __VLS_ctx.chat.message?.orders?.length > 0))
                    return;
                __VLS_ctx.emit('select-menu', $event);
            }
        };
        var __VLS_6;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-sm font-base mt-2 text-right" },
        });
        (__VLS_ctx.formatDate(__VLS_ctx.chat?.createdAt ?? ''));
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (__VLS_ctx.bubbleClass) },
    });
    const __VLS_11 = ((__VLS_ctx.bubbleComponent));
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        ...{ 'onSelectMenu': {} },
        chat: (__VLS_ctx.chat),
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onSelectMenu': {} },
        chat: (__VLS_ctx.chat),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_15;
    let __VLS_16;
    let __VLS_17;
    const __VLS_18 = {
        onSelectMenu: (...[$event]) => {
            if (!!([__VLS_ctx.Intent.ORDER_PAYMENT, __VLS_ctx.Intent.ORDER_STATUS].includes(__VLS_ctx.intent)))
                return;
            __VLS_ctx.emit('select-menu', $event);
        }
    };
    var __VLS_14;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm font-base mt-2 text-right" },
    });
    (__VLS_ctx.formatDate(__VLS_ctx.chat?.createdAt ?? ''));
}
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-base']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-base']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-base']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Intent: Intent,
            BubbleMessage: BubbleMessage,
            formatDate: formatDate,
            emit: emit,
            intent: intent,
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
