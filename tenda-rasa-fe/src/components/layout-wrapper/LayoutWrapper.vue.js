import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { importImage } from '@/utils/helper';
import Header from '../header-section/Header.vue';
import Footer from '../footer-section/Footer.vue';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const route = useRoute();
const isMounted = ref(false);
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const showHeader = computed(() => route.meta?.showHeader !== false);
const showFooter = computed(() => route.meta?.showFooter !== false);
const showBackground = computed(() => route.meta?.showBackground !== false);
const showButtonNavigation = computed(() => route.meta?.showButtonNavigation !== false);
//----------------------------------------
// 🎯 Watchers
//----------------------------------------
//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(() => {
    isMounted.value = true;
});
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
    id: "LayoutWrapper",
    ...{ class: "flex flex-col h-screen" },
});
const __VLS_0 = {}.Teleport;
/** @type {[typeof __VLS_components.Teleport, typeof __VLS_components.Teleport, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: "#background",
}));
const __VLS_2 = __VLS_1({
    to: "#background",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
if (__VLS_ctx.showBackground && __VLS_ctx.isMounted) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bg-fade" },
        ...{ style: ({ backgroundImage: `url(${__VLS_ctx.importImage('bg-tenda-rasa.svg')})` }) },
    });
}
var __VLS_3;
if (__VLS_ctx.showHeader) {
    /** @type {[typeof Header, typeof Header, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(Header, new Header({}));
    const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
    __VLS_6.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex" },
    });
    var __VLS_6;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "flex-1 overflow-y-auto" },
});
var __VLS_7 = {};
if (__VLS_ctx.showFooter) {
    /** @type {[typeof Footer, typeof Footer, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(Footer, new Footer({}));
    const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    if (__VLS_ctx.showButtonNavigation) {
        const __VLS_12 = {}.BottomNavbar;
        /** @type {[typeof __VLS_components.BottomNavbar, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
        const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    }
    var __VLS_11;
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-fade']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
// @ts-ignore
var __VLS_8 = __VLS_7;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            importImage: importImage,
            Header: Header,
            Footer: Footer,
            isMounted: isMounted,
            showHeader: showHeader,
            showFooter: showFooter,
            showBackground: showBackground,
            showButtonNavigation: showButtonNavigation,
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
