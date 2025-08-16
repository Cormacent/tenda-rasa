<template>
    <el-dialog v-model="dialogVisible" width="400px" :close-on-click-modal="true" :show-close="true" class="rounded-lg">
        <template #header>
            <h3 class="text-lg font-bold text-center text-gray-800">
                Masukkan data diri kamu sebelum melanjutkan ke pembayaran yaa!
            </h3>
        </template>

        <div class="space-y-4 mt-2">
            <!-- Nama -->
            <div class="flex items-center gap-3">
                <icon-ep-user class="text-xl text-primary" />
                <el-input v-model="userInfo.name" placeholder="Masukkan Nama" size="large" class="flex-1" />
            </div>

            <!-- No. Telepon -->
            <div class="flex items-center gap-3">
                <icon-ep-message class="text-xl text-primary" />
                <el-input v-model="userInfo.email" placeholder="Masukkan Email" size="large" class="flex-1" />
            </div>
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
