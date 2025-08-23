import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const route = useRoute();
const router = useRouter();
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const headerTitle = computed(() => route.meta?.title);
const useTransparentHeader = computed(() => route.meta?.useTransparentHeader);
//----------------------------------------
// 🎯 Watchers
//----------------------------------------
//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const goToParent = () => {
    const segments = route.path.split('/').filter(Boolean); // remove empty segments
    if (window.history.length > 1 || segments.length > 0) {
        router.back(); // go to previous history
    }
    else {
        router.replace({ name: 'explore-booths' }); // fallback
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    id: "Header",
    ...{ class: "sticky top-0 z-50 p-4 flex items-center bg-transparent h-[4rem]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-shrink-0" },
});
var __VLS_0 = {};
const __VLS_2 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(__VLS_2, new __VLS_2({
    ...{ 'onClick': {} },
    ...{ class: "rounded-lg" },
    ...{ style: {} },
}));
const __VLS_4 = __VLS_3({
    ...{ 'onClick': {} },
    ...{ class: "rounded-lg" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onClick: (...[$event]) => {
        __VLS_ctx.goToParent();
    }
};
__VLS_5.slots.default;
const __VLS_10 = {}.IconEpArrowLeftBold;
/** @type {[typeof __VLS_components.IconEpArrowLeftBold, typeof __VLS_components.iconEpArrowLeftBold, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ class: "text-primary" },
}));
const __VLS_12 = __VLS_11({
    ...{ class: "text-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
var __VLS_5;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-1 text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-2xl font-bold" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ml-[-3rem]" },
});
(__VLS_ctx.headerTitle);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-shrink-0" },
});
var __VLS_14 = {};
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[4rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-[-3rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_15 = __VLS_14;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            headerTitle: headerTitle,
            goToParent: goToParent,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
