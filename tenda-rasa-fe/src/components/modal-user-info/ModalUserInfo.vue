<template>
    <el-dialog v-model="dialogVisible" width="350px" :close-on-click-modal="true" :show-close="true"
        class="rounded-lg relative bg-dialog overflow-hidden">
        <div class="bg-mask" />

        <template #header>
            <h3 class="text-lg font-bold text-start text-gray-700">
                Masukkan data diri kamu sebelum melanjutkan ke pembayaran yaa!
            </h3>
        </template>

        <div class="space-y-4 mt-2">
            <!-- Nama -->
            <el-input v-model="userInfo.name" placeholder="Masukkan Nama" size="large" class="w-full">
                <template #prefix>
                    <icon-ep-user class="text-xl text-primary" />
                </template>
            </el-input>

            <!-- Email -->
            <el-input v-model="userInfo.email" placeholder="Masukkan Email" size="large" class="w-full">
                <template #prefix>
                    <icon-ep-message class="text-xl text-primary" />
                </template>
            </el-input>
        </div>

        <template #footer>
            <el-button type="danger" size="large" round class="w-full" @click="submit">
                Lanjutkan
            </el-button>
        </template>
    </el-dialog>
</template>


<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const userStore = useUserStore()
const visible = ref<boolean>(true)
const emit = defineEmits<{
    (e: 'submit', payload: any): void,
    (e: 'update:visible', value: boolean): void

}>()
const props = defineProps<{
    visible: boolean
}>()


//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const userInfo = computed(() => (userStore.userInfo))
const dialogVisible = computed({
    get: () => props.visible,
    set: (val: boolean) => emit('update:visible', val),
})

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
const submit = () => {
    const { name, email } = userInfo.value

    if (!name || !email) {
        ElMessage.warning('Nama dan Email wajib diisi')
        return
    }

    if (!isValidEmail(email)) {
        ElMessage.error('Format email tidak valid')
        return
    }

    emit('submit', userInfo.value)
    emit('update:visible', false)
}



</script>
<style lang="scss" scoped>
.bg-dialog {
    background-image: url('/bg-tenda-rasa.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    z-index: 0;
}

.bg-mask {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background-color: white;
    mask-image: linear-gradient(to bottom left, transparent 0%, white 45%, white 100%);
    mask-mode: alpha;
}

:deep(.el-input__wrapper) {
    background-color: #ffffff !important;
    border-radius: 8px;
    border: 1px solid var(--el-color-primary);
    -webkit-appearance: none;
    appearance: none;
    box-shadow: none;
    padding: 10px 12px;
    min-height: 48px;
}

:deep(.el-input__inner) {
    color: var(--el-color-primary);
    -webkit-text-fill-color: var(--el-color-primary);
    font-size: 16px;
    min-height: 24px;
    line-height: 24px;
}

:deep(.el-input__inner::placeholder) {
    color: var(--el-color-primary);
    opacity: 0.6;
}
</style>