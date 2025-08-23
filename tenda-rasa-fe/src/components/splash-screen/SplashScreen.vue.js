import { importImage } from '@/utils/helper';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    id: "SplashScreen",
    ...{ class: "relative w-screen h-screen bg-white overflow-hidden flex items-center justify-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ onError: (...[$event]) => {
            console.error('Image not found:', __VLS_ctx.importImage('bg-tenda-rasa.svg'));
        } },
    src: (__VLS_ctx.importImage('bg-tenda-rasa.svg')),
    alt: "Tenda Rasa",
    ...{ class: "absolute inset-0 w-full h-full object-cover z-0" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ onError: (...[$event]) => {
            console.error('Image not found:', __VLS_ctx.importImage('splash-screen-logo.svg'));
        } },
    src: (__VLS_ctx.importImage('splash-screen-logo.svg')),
    alt: "Tenda Rasa",
    ...{ class: "z-10 w-auto h-auto max-w-xs pointer-events-none" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['z-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            importImage: importImage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
