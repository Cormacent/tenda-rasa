import { useMenuStore } from '@/store/menu';
import { computed, onMounted } from 'vue';
import { importImage } from '@/utils/helper';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const menuStore = useMenuStore();
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const menupageInfo = computed(() => menuStore.pageInfo);
const menuList = computed(() => menuStore.pageInfo.data);
//----------------------------------------
// 🎯 Watchers
//----------------------------------------
//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(async () => {
    menupageInfo.value.limit = 10;
    await getMenuPage();
});
const getMenuPage = async () => {
    await menuStore.getMenuPage();
};
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
    id: "ExploreBooth",
    ...{ class: "flex flex-col h-full bg-gradient-to-b from-white/20 to-white container mx-auto px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shrink-0 my-5" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex justify-between items-start" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-3xl font-bold text-black" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onInput': {} },
    modelValue: (__VLS_ctx.menupageInfo.filters.menuName),
    placeholder: "Apa yang mau kamu pesan?",
    clearable: true,
    ...{ class: "w-full mt-4" },
    inputStyle: "color: var(--el-color-primary);",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onInput': {} },
    modelValue: (__VLS_ctx.menupageInfo.filters.menuName),
    placeholder: "Apa yang mau kamu pesan?",
    clearable: true,
    ...{ class: "w-full mt-4" },
    inputStyle: "color: var(--el-color-primary);",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onInput: (__VLS_ctx.getMenuPage)
};
__VLS_3.slots.default;
{
    const { prefix: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_8 = {}.IconEpSearch;
    /** @type {[typeof __VLS_components.IconEpSearch, typeof __VLS_components.iconEpSearch, ]} */;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ class: "text-primary" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-1 overflow-y-auto" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-2 gap-4 py-4" },
});
for (const [menu] of __VLS_getVForSourceType((__VLS_ctx.menuList))) {
    const __VLS_12 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        key: (menu.id),
        to: ({ name: 'booth-detail', params: { menuId: menu.id } }),
        ...{ class: "flex" },
    }));
    const __VLS_14 = __VLS_13({
        key: (menu.id),
        to: ({ name: 'booth-detail', params: { menuId: menu.id } }),
        ...{ class: "flex" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_15.slots.default;
    const __VLS_16 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ class: "w-full shadow-md bg-white flex flex-col items-center justify-center" },
        bodyStyle: ({
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }),
    }));
    const __VLS_18 = __VLS_17({
        ...{ class: "w-full shadow-md bg-white flex flex-col items-center justify-center" },
        bodyStyle: ({
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (menu.imageUrl ? menu.imageUrl : __VLS_ctx.importImage('default.jpg')),
        alt: "menu image",
        ...{ class: "w-24 h-24 object-cover rounded-lg mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-lg font-semibold text-gray-800 text-center w-full line-clamp-2" },
    });
    (menu.menuName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-gray-500 text-center mt-2" },
    });
    (menu.estimatedMinutes);
    var __VLS_19;
    var __VLS_15;
}
/** @type {__VLS_StyleScopedClasses['flex']} */;
/** @type {__VLS_StyleScopedClasses['flex-col']} */;
/** @type {__VLS_StyleScopedClasses['h-full']} */;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */;
/** @type {__VLS_StyleScopedClasses['from-white/20']} */;
/** @type {__VLS_StyleScopedClasses['to-white']} */;
/** @type {__VLS_StyleScopedClasses['container']} */;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */;
/** @type {__VLS_StyleScopedClasses['px-4']} */;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */;
/** @type {__VLS_StyleScopedClasses['my-5']} */;
/** @type {__VLS_StyleScopedClasses['flex']} */;
/** @type {__VLS_StyleScopedClasses['justify-between']} */;
/** @type {__VLS_StyleScopedClasses['items-start']} */;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */;
/** @type {__VLS_StyleScopedClasses['font-bold']} */;
/** @type {__VLS_StyleScopedClasses['text-black']} */;
/** @type {__VLS_StyleScopedClasses['w-full']} */;
/** @type {__VLS_StyleScopedClasses['mt-4']} */;
/** @type {__VLS_StyleScopedClasses['text-primary']} */;
/** @type {__VLS_StyleScopedClasses['flex-1']} */;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */;
/** @type {__VLS_StyleScopedClasses['grid']} */;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */;
/** @type {__VLS_StyleScopedClasses['gap-4']} */;
/** @type {__VLS_StyleScopedClasses['py-4']} */;
/** @type {__VLS_StyleScopedClasses['flex']} */;
/** @type {__VLS_StyleScopedClasses['w-full']} */;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */;
/** @type {__VLS_StyleScopedClasses['bg-white']} */;
/** @type {__VLS_StyleScopedClasses['flex']} */;
/** @type {__VLS_StyleScopedClasses['flex-col']} */;
/** @type {__VLS_StyleScopedClasses['items-center']} */;
/** @type {__VLS_StyleScopedClasses['justify-center']} */;
/** @type {__VLS_StyleScopedClasses['w-24']} */;
/** @type {__VLS_StyleScopedClasses['h-24']} */;
/** @type {__VLS_StyleScopedClasses['object-cover']} */;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */;
/** @type {__VLS_StyleScopedClasses['mb-4']} */;
/** @type {__VLS_StyleScopedClasses['text-lg']} */;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */;
/** @type {__VLS_StyleScopedClasses['text-center']} */;
/** @type {__VLS_StyleScopedClasses['w-full']} */;
/** @type {__VLS_StyleScopedClasses['line-clamp-2']} */;
/** @type {__VLS_StyleScopedClasses['text-sm']} */;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */;
/** @type {__VLS_StyleScopedClasses['text-center']} */;
/** @type {__VLS_StyleScopedClasses['mt-2']} */;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            importImage: importImage,
            menupageInfo: menupageInfo,
            menuList: menuList,
            getMenuPage: getMenuPage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
