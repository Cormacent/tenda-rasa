import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const userStore = useUserStore();
const visible = ref(true);
const emit = defineEmits();
const props = defineProps();
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const userInfo = computed(() => (userStore.userInfo));
const dialogVisible = computed({
    get: () => props.visible,
    set: (val) => emit('update:visible', val),
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
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const submit = () => {
    const { name, email } = userInfo.value;
    if (!name || !email) {
        ElMessage.warning('Nama dan Email wajib diisi');
        return;
    }
    if (!isValidEmail(email)) {
        ElMessage.error('Format email tidak valid');
        return;
    }
    emit('submit', userInfo.value);
    emit('update:visible', false);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.dialogVisible),
    width: "400px",
    closeOnClickModal: (true),
    showClose: (true),
    ...{ class: "rounded-lg relative bg-dialog" },
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.dialogVisible),
    width: "400px",
    closeOnClickModal: (true),
    showClose: (true),
    ...{ class: "rounded-lg relative bg-dialog" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: "bg-mask" },
});
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-lg font-bold text-start text-gray-700" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-4 mt-2" },
});
const __VLS_5 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    modelValue: (__VLS_ctx.userInfo.name),
    placeholder: "Masukkan Nama",
    size: "large",
    ...{ class: "w-full" },
}));
const __VLS_7 = __VLS_6({
    modelValue: (__VLS_ctx.userInfo.name),
    placeholder: "Masukkan Nama",
    size: "large",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
{
    const { prefix: __VLS_thisSlot } = __VLS_8.slots;
    const __VLS_9 = {}.IconEpUser;
    /** @type {[typeof __VLS_components.IconEpUser, typeof __VLS_components.iconEpUser, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        ...{ class: "text-xl text-primary" },
    }));
    const __VLS_11 = __VLS_10({
        ...{ class: "text-xl text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
}
var __VLS_8;
const __VLS_13 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    modelValue: (__VLS_ctx.userInfo.email),
    placeholder: "Masukkan Email",
    size: "large",
    ...{ class: "w-full" },
}));
const __VLS_15 = __VLS_14({
    modelValue: (__VLS_ctx.userInfo.email),
    placeholder: "Masukkan Email",
    size: "large",
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
{
    const { prefix: __VLS_thisSlot } = __VLS_16.slots;
    const __VLS_17 = {}.IconEpMessage;
    /** @type {[typeof __VLS_components.IconEpMessage, typeof __VLS_components.iconEpMessage, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        ...{ class: "text-xl text-primary" },
    }));
    const __VLS_19 = __VLS_18({
        ...{ class: "text-xl text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
}
var __VLS_16;
{
    const { footer: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_21 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ 'onClick': {} },
        type: "danger",
        size: "large",
        round: true,
        ...{ class: "w-full" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onClick': {} },
        type: "danger",
        size: "large",
        round: true,
        ...{ class: "w-full" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_25;
    let __VLS_26;
    let __VLS_27;
    const __VLS_28 = {
        onClick: (__VLS_ctx.submit)
    };
    __VLS_24.slots.default;
    var __VLS_24;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-start']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            userInfo: userInfo,
            dialogVisible: dialogVisible,
            submit: submit,
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
