import { useUserStore } from '@/store/user';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ModalUserInfo from '../modal-user-info/ModalUserInfo.vue';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const visibleModal = ref(false);
const savedLink = ref();
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
//----------------------------------------
// 🎯 Watchers
//----------------------------------------
//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const openLink = (name) => {
    if (name !== 'explore-booths' && (!userStore.userInfo || userStore.userInfo.name === '' || userStore.userInfo.email === '')) {
        visibleModal.value = true;
        savedLink.value = name;
        return;
    }
    router.push({ name });
};
const isActive = (name) => {
    return route.path?.toString().includes(name);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "w-screen h-full bg-white border-t shadow z-50 align-center flex" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "flex justify-around my-auto w-full" },
});
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: ([
            'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
            __VLS_ctx.isActive('explore-booths')
                ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
        ]) },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: ([
            'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
            __VLS_ctx.isActive('explore-booths')
                ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.openLink('explore-booths');
    }
};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
    ...{ class: (__VLS_ctx.isActive('explore-booths') ? 'text-white' : 'text-primary') },
});
const __VLS_8 = {}.IconEpHouse;
/** @type {[typeof __VLS_components.IconEpHouse, typeof __VLS_components.iconEpHouse, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
if (__VLS_ctx.isActive('explore-booths')) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-base font-base" },
    });
}
var __VLS_3;
const __VLS_12 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    ...{ class: ([
            'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
            __VLS_ctx.isActive('order-list')
                ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
        ]) },
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    ...{ class: ([
            'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
            __VLS_ctx.isActive('order-list')
                ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (...[$event]) => {
        __VLS_ctx.openLink('order-list');
    }
};
__VLS_15.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
    ...{ class: (__VLS_ctx.isActive('order-list') ? 'text-white' : 'text-primary') },
});
const __VLS_20 = {}.IconEpDocument;
/** @type {[typeof __VLS_components.IconEpDocument, typeof __VLS_components.iconEpDocument, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
if (__VLS_ctx.isActive('order-list')) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-base font-base" },
    });
}
var __VLS_15;
const __VLS_24 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    ...{ 'onClick': {} },
    ...{ class: ([
            'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
            __VLS_ctx.isActive('checkout')
                ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
        ]) },
}));
const __VLS_26 = __VLS_25({
    ...{ 'onClick': {} },
    ...{ class: ([
            'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
            __VLS_ctx.isActive('checkout')
                ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    onClick: (...[$event]) => {
        __VLS_ctx.openLink('checkout');
    }
};
__VLS_27.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
    ...{ class: (__VLS_ctx.isActive('checkout') ? 'text-white' : 'text-primary') },
});
const __VLS_32 = {}.IconEpShoppingCart;
/** @type {[typeof __VLS_components.IconEpShoppingCart, typeof __VLS_components.iconEpShoppingCart, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
if (__VLS_ctx.isActive('checkout')) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-base font-base" },
    });
}
var __VLS_27;
const __VLS_36 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    ...{ class: ([
            'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
            __VLS_ctx.isActive('room-chat')
                ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
        ]) },
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    ...{ class: ([
            'flex items-center gap-2 px-3 py-2 rounded focus:outline-none active:outline-none',
            __VLS_ctx.isActive('room-chat')
                ? 'bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary'
                : 'bg-transparent text-primary border-none shadow-none hover:bg-transparent focus:bg-transparent active:bg-transparent'
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (...[$event]) => {
        __VLS_ctx.openLink('room-chat');
    }
};
__VLS_39.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
    ...{ class: (__VLS_ctx.isActive('room-chat') ? 'text-white' : 'text-primary') },
});
const __VLS_44 = {}.IconEpChatDotRound;
/** @type {[typeof __VLS_components.IconEpChatDotRound, typeof __VLS_components.iconEpChatDotRound, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
if (__VLS_ctx.isActive('room-chat')) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-base font-base" },
    });
}
var __VLS_39;
/** @type {[typeof ModalUserInfo, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(ModalUserInfo, new ModalUserInfo({
    ...{ 'onSubmit': {} },
    visible: (__VLS_ctx.visibleModal),
}));
const __VLS_49 = __VLS_48({
    ...{ 'onSubmit': {} },
    visible: (__VLS_ctx.visibleModal),
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_51;
let __VLS_52;
let __VLS_53;
const __VLS_54 = {
    onSubmit: (...[$event]) => {
        __VLS_ctx.openLink(__VLS_ctx.savedLink ?? '');
    }
};
var __VLS_50;
/** @type {__VLS_StyleScopedClasses['w-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-around']} */ ;
/** @type {__VLS_StyleScopedClasses['my-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['active:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-base']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['active:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-base']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['active:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-base']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['active:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-base']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ModalUserInfo: ModalUserInfo,
            visibleModal: visibleModal,
            savedLink: savedLink,
            openLink: openLink,
            isActive: isActive,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
