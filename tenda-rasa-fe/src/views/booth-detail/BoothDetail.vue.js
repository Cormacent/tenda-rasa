import { importImage } from '@/utils/helper';
import { useMenuStore } from '@/store/menu';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/store/order';
import ModalUserInfo from '@/components/modal-user-info/ModalUserInfo.vue';
import { useUserStore } from '@/store/user';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const menuStore = useMenuStore();
const menuId = ref();
const route = useRoute();
const orderStore = useOrderStore();
const userStore = useUserStore();
const router = useRouter();
const visibleModal = ref(false);
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const menuDetail = computed(() => menuStore.menuDetail || {});
const menuInOrderItemsCount = computed(() => {
    return orderStore.orderItems.find(item => item.menuId === menuDetail.value.id)?.quantity || 0;
});
//----------------------------------------
// 🎯 Watchers
//----------------------------------------
//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(async () => {
    menuId.value = route.params.menuId;
    if (menuId.value) {
        await menuStore.getMenuById(+menuId.value);
    }
});
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const addToCart = () => {
    if (!menuDetail.value.id)
        return;
    if (!userStore.userInfo || userStore.userInfo.name === '' || userStore.userInfo.email === '') {
        visibleModal.value = true;
        return;
    }
    orderStore.addToCheckoutList(menuDetail.value);
};
const removeFromCart = () => {
    if (!menuDetail.value.id)
        return;
    orderStore.removeFromCheckoutList(menuDetail.value);
};
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    id: "BoothDetail",
    ...{ class: "flex flex-col h-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex-shrink-0 z-10 p-5" },
});
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ class: "rounded-lg" },
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ class: "rounded-lg" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.goToParent();
    }
};
__VLS_3.slots.default;
const __VLS_8 = {}.IconEpArrowLeftBold;
/** @type {[typeof __VLS_components.IconEpArrowLeftBold, typeof __VLS_components.iconEpArrowLeftBold, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "text-primary" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "text-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    ...{ onError: (...[$event]) => {
            console.error('Image not found:', __VLS_ctx.menuDetail.imageUrl);
        } },
    src: (__VLS_ctx.menuDetail.imageUrl || __VLS_ctx.importImage('default.jpg')),
    alt: (__VLS_ctx.menuDetail.menuName),
    ...{ class: "w-full h-80 object-cover -mt-[5rem]" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col flex-1 bg-white rounded-t-2xl shadow-lg -mt-12 overflow-hidden" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overflow-y-auto px-4 pt-6 pb-4 flex-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-xl font-bold text-primary" },
});
(__VLS_ctx.menuDetail.boothName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "text-base font-semibold text-secondary mb-2" },
});
(__VLS_ctx.menuDetail.menuName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center text-base font-medium text-gray-700 mb-4" },
});
const __VLS_12 = {}.IconEpClock;
/** @type {[typeof __VLS_components.IconEpClock, typeof __VLS_components.iconEpClock, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ class: "mr-1" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "mr-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
(__VLS_ctx.menuDetail.estimatedMinutes);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-700 text-base font-medium mb-4" },
});
(__VLS_ctx.menuDetail.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "text-base font-medium text-gray-700 space-y-1 mb-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
(__VLS_ctx.menuDetail.category === 'makanan' ? 'makan' : 'minum');
if (__VLS_ctx.menuDetail.category === 'makanan') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    (__VLS_ctx.menuDetail.spicinessLevel);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shrink-0 px-4 py-5 border-t" },
});
if (__VLS_ctx.menuInOrderItemsCount > 0 && __VLS_ctx.menuDetail.stock) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center gap-5 justify-center w-full" },
    });
    const __VLS_16 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ 'onClick': {} },
        size: "small",
        ...{ class: ([
                'flex items-center px-3 py-2 rounded focus:outline-none',
                'bg-white text-primary border border-primary shadow-none',
                'hover:bg-white hover:text-primary hover:border-primary',
                'focus:bg-white focus:text-primary focus:border-primary',
                'active:bg-white active:text-primary active:border-primary'
            ]) },
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onClick': {} },
        size: "small",
        ...{ class: ([
                'flex items-center px-3 py-2 rounded focus:outline-none',
                'bg-white text-primary border border-primary shadow-none',
                'hover:bg-white hover:text-primary hover:border-primary',
                'focus:bg-white focus:text-primary focus:border-primary',
                'active:bg-white active:text-primary active:border-primary'
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_20;
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = {
        onClick: (__VLS_ctx.removeFromCart)
    };
    __VLS_19.slots.default;
    const __VLS_24 = {}.IconEpMinus;
    /** @type {[typeof __VLS_components.IconEpMinus, typeof __VLS_components.iconEpMinus, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_19;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-lg font-semibold" },
    });
    (__VLS_ctx.menuInOrderItemsCount);
    const __VLS_28 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (__VLS_ctx.menuInOrderItemsCount >= (__VLS_ctx.menuDetail.stock ?? 0)),
        ...{ class: ([
                'flex items-center px-3 py-2 rounded focus:outline-none',
                'bg-primary text-white border border-primary shadow-none',
                'hover:bg-primary hover:text-white hover:border-primary',
                'focus:bg-primary focus:text-white focus:border-primary',
                'active:bg-primary active:text-white active:border-primary'
            ]) },
    }));
    const __VLS_30 = __VLS_29({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (__VLS_ctx.menuInOrderItemsCount >= (__VLS_ctx.menuDetail.stock ?? 0)),
        ...{ class: ([
                'flex items-center px-3 py-2 rounded focus:outline-none',
                'bg-primary text-white border border-primary shadow-none',
                'hover:bg-primary hover:text-white hover:border-primary',
                'focus:bg-primary focus:text-white focus:border-primary',
                'active:bg-primary active:text-white active:border-primary'
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    let __VLS_32;
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = {
        onClick: (__VLS_ctx.addToCart)
    };
    __VLS_31.slots.default;
    const __VLS_36 = {}.IconEpPlus;
    /** @type {[typeof __VLS_components.IconEpPlus, typeof __VLS_components.iconEpPlus, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_31;
    const __VLS_40 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        to: ({ name: 'checkout' }),
        ...{ class: "ml-2" },
    }));
    const __VLS_42 = __VLS_41({
        to: ({ name: 'checkout' }),
        ...{ class: "ml-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    const __VLS_44 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        type: "primary",
        size: "small",
        ...{ class: ([
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none',
                'bg-primary text-white border border-primary shadow-none',
                'hover:bg-primary hover:text-white hover:border-primary',
                'focus:bg-primary focus:text-white focus:border-primary',
                'active:bg-primary active:text-white active:border-primary'
            ]) },
    }));
    const __VLS_46 = __VLS_45({
        type: "primary",
        size: "small",
        ...{ class: ([
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none',
                'bg-primary text-white border border-primary shadow-none',
                'hover:bg-primary hover:text-white hover:border-primary',
                'focus:bg-primary focus:text-white focus:border-primary',
                'active:bg-primary active:text-white active:border-primary'
            ]) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    const __VLS_48 = {}.IconEpShoppingCart;
    /** @type {[typeof __VLS_components.IconEpShoppingCart, typeof __VLS_components.iconEpShoppingCart, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        ...{ class: "text-white" },
    }));
    const __VLS_50 = __VLS_49({
        ...{ class: "text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    var __VLS_47;
    var __VLS_43;
}
else {
    const __VLS_52 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        ...{ 'onClick': {} },
        ...{ class: ([
                'w-full',
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none',
                'bg-primary text-white border border-primary shadow-none',
                'hover:bg-white hover:text-primary hover:border-primary',
                'focus:bg-white focus:text-primary focus:border-primary',
                'active:bg-white active:text-primary active:border-primary'
            ]) },
        size: "large",
        round: true,
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        ...{ class: ([
                'w-full',
                'flex items-center gap-2 px-3 py-2 rounded focus:outline-none',
                'bg-primary text-white border border-primary shadow-none',
                'hover:bg-white hover:text-primary hover:border-primary',
                'focus:bg-white focus:text-primary focus:border-primary',
                'active:bg-white active:text-primary active:border-primary'
            ]) },
        size: "large",
        round: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_56;
    let __VLS_57;
    let __VLS_58;
    const __VLS_59 = {
        onClick: (__VLS_ctx.addToCart)
    };
    __VLS_55.slots.default;
    var __VLS_55;
}
/** @type {[typeof ModalUserInfo, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(ModalUserInfo, new ModalUserInfo({
    ...{ 'onSubmit': {} },
    visible: (__VLS_ctx.visibleModal),
}));
const __VLS_61 = __VLS_60({
    ...{ 'onSubmit': {} },
    visible: (__VLS_ctx.visibleModal),
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
let __VLS_63;
let __VLS_64;
let __VLS_65;
const __VLS_66 = {
    onSubmit: (__VLS_ctx.addToCart)
};
var __VLS_62;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-80']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['-mt-[5rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-t-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['-mt-12']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-5']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['active:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['active:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['active:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['active:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:border-primary']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            importImage: importImage,
            ModalUserInfo: ModalUserInfo,
            visibleModal: visibleModal,
            menuDetail: menuDetail,
            menuInOrderItemsCount: menuInOrderItemsCount,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            goToParent: goToParent,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
