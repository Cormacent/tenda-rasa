import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoomChat } from './RoomChat.logic';
import { importImage } from '@/utils/helper';
import { useChatbotStore } from '@/store/chatbot';
import BubbleContainer from './components/bubble-container/BubbleContainer.vue';
import { useChatSocket } from '@/composables/useChatSocket';
import { useUserStore } from '@/store/user';
import { Role } from '@/enums/role';
import { Intent } from '@/enums/intent';
import { useOrderStore } from '@/store/order';
import { useRouter } from 'vue-router';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const { message, mounted } = useRoomChat();
const chatbotStore = useChatbotStore();
const { messages, sendMessage, isOnline } = useChatSocket();
const { userInfo } = useUserStore();
const orderStore = useOrderStore();
const RoomChatMessages = ref(null);
const router = useRouter();
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
//----------------------------------------
// 🎯 Watchers
//----------------------------------------
watch(messages, async () => {
    scrollToBottom();
}, { deep: true });
//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(async () => {
    mounted.value = true;
    await getAllChat();
    scrollToBottom();
});
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const scrollToBottom = async () => {
    await nextTick();
    RoomChatMessages.value?.scrollTo({
        top: RoomChatMessages.value.scrollHeight,
        behavior: 'smooth',
    });
};
const onSendMessage = () => {
    if (!message.value.trim())
        return;
    sendMessage({
        name: userInfo?.name ?? '',
        email: userInfo.email ?? '',
        message: {
            chat: message.value,
            intent: Intent.USER
        },
        role: Role.USER,
        intent: Intent.USER
    });
    message.value = '';
};
const getAllChat = async () => {
    const response = await chatbotStore.getAllChatByEmail();
    if (response) {
        messages.value = response;
    }
    else {
        console.error("Gagal mendapatkan chat");
    }
};
const addToCart = (menu) => {
    if (!menu.id)
        return;
    orderStore.addToCheckoutList(menu);
    router.push({ name: 'checkout' });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    id: "room-chat",
    ...{ class: "flex flex-col h-full " },
    ref: "RoomChat",
});
/** @type {typeof __VLS_ctx.RoomChat} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "absolute top-0 right-0 w-full h-full pointer-events-none -z-10" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shrink-0 mb-2 container mx-auto px-4 " },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "card rounded flex gap-4 items-center bg-white shadow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.importImage('robot.svg')),
    alt: "Robot",
    ...{ class: "w-16 h-16 p-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col justify-center items-center h-16" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "text-lg font-semibold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "inline-block w-3 h-3 rounded-full border-2 border-white" },
    ...{ class: ({
            'bg-success': __VLS_ctx.isOnline,
            'bg-primary': !__VLS_ctx.isOnline
        }) },
    title: "Online",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ml-1 text-xs font-medium" },
});
(__VLS_ctx.isOnline ? 'Online' : 'Offline');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-1 overflow-y-auto space-y-4 container mx-auto px-4" },
    ref: "RoomChatMessages",
});
/** @type {typeof __VLS_ctx.RoomChatMessages} */ ;
for (const [msg, idx] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (idx),
        ...{ class: (msg.role === 'user' ? 'flex justify-end' : 'flex justify-start') },
    });
    /** @type {[typeof BubbleContainer, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(BubbleContainer, new BubbleContainer({
        ...{ 'onSelectMenu': {} },
        chat: (msg),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onSelectMenu': {} },
        chat: (msg),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onSelectMenu: (__VLS_ctx.addToCart)
    };
    var __VLS_2;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shrink-0 px-4 py-2 border-t flex gap-2 items-center bg-white" },
});
const __VLS_7 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.message),
    placeholder: "Ketik pesan...",
    ...{ class: "flex-1" },
    size: "large",
    clearable: true,
}));
const __VLS_9 = __VLS_8({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.message),
    placeholder: "Ketik pesan...",
    ...{ class: "flex-1" },
    size: "large",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_11;
let __VLS_12;
let __VLS_13;
const __VLS_14 = {
    onKeyup: (__VLS_ctx.onSendMessage)
};
var __VLS_10;
const __VLS_15 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
}));
const __VLS_17 = __VLS_16({
    ...{ 'onClick': {} },
    type: "primary",
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
let __VLS_19;
let __VLS_20;
let __VLS_21;
const __VLS_22 = {
    onClick: (__VLS_ctx.onSendMessage)
};
__VLS_18.slots.default;
const __VLS_23 = {}.IconEpPosition;
/** @type {[typeof __VLS_components.IconEpPosition, typeof __VLS_components.iconEpPosition, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ class: "text-white" },
}));
const __VLS_25 = __VLS_24({
    ...{ class: "text-white" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
var __VLS_18;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['-z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-success']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            importImage: importImage,
            BubbleContainer: BubbleContainer,
            message: message,
            messages: messages,
            isOnline: isOnline,
            RoomChatMessages: RoomChatMessages,
            onSendMessage: onSendMessage,
            addToCart: addToCart,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
