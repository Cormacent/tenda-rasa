import { computed, onMounted, ref, } from 'vue';
import { importImage } from '@/utils/helper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useMenuStore } from '@/store/menu';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import ModalUserInfo from '@/components/modal-user-info/ModalUserInfo.vue';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const menuStore = useMenuStore();
const modules = [Navigation, Pagination];
const visibleModal = ref(false);
const userStore = useUserStore();
const router = useRouter();
const savedLink = ref();
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
    menupageInfo.value.limit = 4;
    await menuStore.getMenuPage();
});
//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const openLink = (name) => {
    if (name !== 'explore-booths' && (!userStore.userInfo || userStore.userInfo.name === '' || userStore.userInfo.email === '')) {
        visibleModal.value = true;
        savedLink.value = name;
        return;
    }
    router.replace({ name });
};
const openMenu = (menuId) => {
    router.replace({ name: 'booth-detail', params: { menuId } });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    id: "Introduction",
    ...{ class: "flex flex-col h-full justify-center gap-5" },
    ref: "Introduction",
});
/** @type {typeof __VLS_ctx.Introduction} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "shrink-0 text-center mb-2 container mx-auto px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-4xl md:text-4xl font-bold mb-6 text-black" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative overflow-visible px-0" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "swiper-layout-wrapper overflow-visible   relative" },
});
const __VLS_0 = {}.Swiper;
/** @type {[typeof __VLS_components.Swiper, typeof __VLS_components.Swiper, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modules: (__VLS_ctx.modules),
    spaceBetween: (20),
    slidesPerView: (1.2),
    centeredSlides: (true),
    initialSlide: (0),
    loop: (false),
    pagination: ({
        clickable: true,
        bulletClass: 'swiper-dot',
        bulletActiveClass: 'swiper-dot-active'
    }),
    ...{ class: "custom-swiper" },
}));
const __VLS_2 = __VLS_1({
    modules: (__VLS_ctx.modules),
    spaceBetween: (20),
    slidesPerView: (1.2),
    centeredSlides: (true),
    initialSlide: (0),
    loop: (false),
    pagination: ({
        clickable: true,
        bulletClass: 'swiper-dot',
        bulletActiveClass: 'swiper-dot-active'
    }),
    ...{ class: "custom-swiper" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
for (const [menu] of __VLS_getVForSourceType((__VLS_ctx.menuList))) {
    const __VLS_4 = {}.SwiperSlide;
    /** @type {[typeof __VLS_components.SwiperSlide, typeof __VLS_components.SwiperSlide, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ 'onClick': {} },
        key: (menu.id),
    }));
    const __VLS_6 = __VLS_5({
        ...{ 'onClick': {} },
        key: (menu.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    let __VLS_8;
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = {
        onClick: (...[$event]) => {
            __VLS_ctx.openMenu(menu.id);
        }
    };
    __VLS_7.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bg-white shadow rounded-xl mb-5 flex flex-col items-center overflow-hidden" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (menu.imageUrl ? menu.imageUrl : __VLS_ctx.importImage('default.jpg')),
        alt: (menu.menuName),
        ...{ class: "w-full h-40 md:h-60 object-cover rounded-t-xl mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-xl font-semibold text-gray-900 mb-1" },
    });
    (menu.menuName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-gray-700 mb-3" },
    });
    (menu.description);
    var __VLS_7;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex align-center justify-center background-transparent mt-4" },
});
const __VLS_12 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    to: ({ name: 'explore-booths' }),
}));
const __VLS_14 = __VLS_13({
    to: ({ name: 'explore-booths' }),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "px-3 py-2 rounded focus:outline-none active:outline-none bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary" },
    size: "large",
}));
const __VLS_18 = __VLS_17({
    ...{ class: "px-3 py-2 rounded focus:outline-none active:outline-none bg-primary text-white border-none shadow-none hover:bg-primary focus:bg-primary active:bg-primary" },
    size: "large",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
var __VLS_19;
var __VLS_15;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative z-10 text-center pt-3  container mx-auto px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm text-gray-700 max-w-md mx-auto" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.openLink('room-chat');
        } },
    ...{ class: "text-primary hover:underline" },
});
/** @type {[typeof ModalUserInfo, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(ModalUserInfo, new ModalUserInfo({
    ...{ 'onSubmit': {} },
    visible: (__VLS_ctx.visibleModal),
}));
const __VLS_21 = __VLS_20({
    ...{ 'onSubmit': {} },
    visible: (__VLS_ctx.visibleModal),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_23;
let __VLS_24;
let __VLS_25;
const __VLS_26 = {
    onSubmit: (...[$event]) => {
        __VLS_ctx.openLink(__VLS_ctx.savedLink ?? '');
    }
};
var __VLS_22;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-black']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-visible']} */ ;
/** @type {__VLS_StyleScopedClasses['px-0']} */ ;
/** @type {__VLS_StyleScopedClasses['swiper-layout-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-visible']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-swiper']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-40']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-60']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-t-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['background-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['active:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-none']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-none']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['active:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            importImage: importImage,
            Swiper: Swiper,
            SwiperSlide: SwiperSlide,
            ModalUserInfo: ModalUserInfo,
            modules: modules,
            visibleModal: visibleModal,
            savedLink: savedLink,
            menuList: menuList,
            openLink: openLink,
            openMenu: openMenu,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
