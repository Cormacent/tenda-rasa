<template>
    <section id="Payment" class="flex flex-col h-full bg-gradient-to-b from-white/20 to-white container mx-auto px-4">
        <div class="absolute top-0 right-0 w-full h-full pointer-events-none -z-10" style="
    mask-image: linear-gradient(to bottom, transparent 100%,   transparent 15%, white 0%);
    mask-mode: alpha;
    background-color: white;
  "></div>

        <div class="flex flex-col flex-1 overflow-y-auto space-y-4 justify-center items-center">
            <img :src="importImage('success-payment.svg')" alt="Success" class="w-80 h-80 p-3" />
            <h1 class="text-4xl font-bold text-primary">Selamat!</h1>
            <p class="text-lg font-semibold text-black">Pembayaran anda berhasil</p>
        </div>

        <div class="shrink-0 px-4 py-2 border-t flex gap-2 items-center bg-white text-center justify-center"
            v-if="showButton">
            <el-button type="primary" size="large" @click="goToStatus">
                Check Status Pesanan
            </el-button>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { useOrderStore } from '@/store/order';
import { useUserStore } from '@/store/user';
import { importImage } from '@/utils/helper';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const router = useRouter()
const route = useRoute()
const { handlePayment } = useOrderStore()
const { userInfo } = useUserStore()

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const orderId = computed(() => route.params?.orderId)
const email = computed(() => route.params?.email)
const name = computed(() => route.params?.name)

const showButton = ref<boolean>(false)

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(() => {
    confirmPaymentOrder()
})

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const goToStatus = () => {
    router.replace({ name: 'order-list' })
}
const confirmPaymentOrder = async () => {
    if (!orderId.value || !email.value || !name.value) {
        return
    }
    const _email = decodeURIComponent(email.value.toString())

    await handlePayment(+orderId.value, _email).then(() => {
        userInfo.email = email.value?.toString()
        userInfo.name = name.value?.toString()
        showButton.value = true
    }).catch(() => {
        showButton.value = false
    })
}

</script>
<style lang="scss" scoped src="./Payment.scss" />
