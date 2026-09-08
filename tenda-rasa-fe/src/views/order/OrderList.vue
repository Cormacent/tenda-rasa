<template>
    <section id="OrderList" class="flex flex-col h-full container mx-auto px-4">
        <div class="absolute top-0 right-0 w-full h-full pointer-events-none -z-10" style="
    mask-image: linear-gradient(to bottom, transparent 0%, white 15%, white 100%);
    mask-mode: alpha;
    background-color: white;
  "></div>
        <!-- Empty State -->
        <div v-if="orderList.length === 0" class="flex-1 flex flex-col items-center justify-center gap-3 text-center px-4">
            <span class="text-6xl">📋</span>
            <p class="text-lg font-bold text-gray-800">Belum ada pesanan</p>
            <p class="text-sm font-semibold text-gray-600">Yuk mulai pesan lewat chat TerraBot!</p>
        </div>
        <!-- Scrollable Order List -->
        <div v-else class="flex-1 overflow-y-auto px-4 space-y-4 py-2">
            <router-link v-for="order in orderList" :key="order.id"
                class="bg-white shadow-md rounded-lg p-4 flex gap-4 w-full"
                :to="{ name: 'order-detail-by-id', params: { orderId: order.id } }">
                <div class="flex gap-4 items-center">
                    <div class="flex">
                        <img :src="importImage(`order-${order.status}.svg`)" alt="menu image"
                            class="w-20 h-20 object-cover rounded-lg" />
                    </div>
                    <div class="flex-1">
                        <!-- Header: ID + Status Badge + Countdown -->
                        <div class="flex items-center gap-2 flex-wrap">
                            <p class="text-base font-bold text-gray-900">
                                #{{ order.name }}-{{ order.id }}
                            </p>
                            <el-tag v-if="order.status === Status.PENDING && !isExpired(order)" type="warning" size="small">Menunggu Pembayaran</el-tag>
                            <el-tag v-else-if="order.status === Status.PENDING && isExpired(order)" type="danger" size="small">Waktu Habis</el-tag>
                            <el-tag v-else-if="order.status && [Status.PAID, Status.COMPLETED].includes(order.status as Status)" type="success" size="small">Berhasil</el-tag>
                            <el-tag v-else-if="order.status === Status.CANCELLED" type="danger" size="small">Dibatalkan</el-tag>
                            <span v-if="order.status === Status.PENDING && !isExpired(order)" class="font-bold text-gray-900 text-sm ml-auto">
                                {{ formattedCountdown(order) }}
                            </span>
                        </div>

                        <!-- Status Description -->
                        <p class="text-sm font-semibold text-gray-700 mt-1">
                            {{
                                order.status === Status.PENDING
                                    ? 'Segera selesaikan pembayaran.'
                                    : order.status === Status.PAID
                                    ? 'Restoran sedang menyiapkan pesananmu.'
                                    : order.status === Status.COMPLETED
                                    ? 'Pesanan kamu telah selesai.'
                                    : 'Pesanan dibatalkan.'
                            }}
                        </p>
                        <div class="flex gap-2 mt-2" v-if="order.orderItems">
                            <template v-for="(item, index) in order.orderItems.slice(0, 3)" :key="index">
                                <img :src="item.imageUrl || importImage('default.jpg')" :alt="item.menuName"
                                    class="w-10 h-10 object-cover rounded" />
                            </template>

                            <div v-if="order.orderItems.length > 3"
                                class="w-10 h-10 flex items-center justify-center rounded bg-gray-200 text-base font-semibold text-gray-900">
                                +{{ order.orderItems.length - 3 }}
                            </div>
                        </div>

                    </div>

                </div>
            </router-link>
        </div>
    </section>
</template>


<script lang="ts" setup>
import { useOrderStore } from '@/store/order';
import { useUserStore } from '@/store/user';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { importImage } from '@/utils/helper';
import { Status } from '@/enums/status';
import { IOrder } from '@/models/IOrder';



//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const orderStore = useOrderStore()
const userStore = useUserStore()
const countdowns = reactive<Record<number, number>>({})
const timers = ref<Record<number, number>>({})
let visibilityHandler: (() => void) | null = null
//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const userInfo = computed(() => userStore.userInfo)
const orderList = computed(() => orderStore.orderList)
//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(() => {
    getOrderDetail()

    // Pause timers when tab is hidden to save resources
    visibilityHandler = () => {
        if (document.hidden) {
            Object.values(timers.value).forEach(t => clearInterval(t))
        } else {
            // Resume: recalculate remaining time from current timestamp
            orderList.value.forEach(order => {
                if (order.status === Status.PENDING && order.createdAt && order.id != null) {
                    clearInterval(timers.value[order.id])
                    startCountdown(order)
                }
            })
        }
    }
    document.addEventListener('visibilitychange', visibilityHandler)
})

onUnmounted(() => {
    Object.values(timers.value).forEach(clearInterval)
    timers.value = {}
    if (visibilityHandler) {
        document.removeEventListener('visibilitychange', visibilityHandler)
        visibilityHandler = null
    }
})

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const getOrderDetail = async () => {
    if (userInfo.value.email) {
        // Clear all existing timers before refetching (prevents duplicate intervals on refresh/re-login)
        Object.values(timers.value).forEach(clearInterval)
        timers.value = {}
        // Reset all countdown values so expired state resets on fresh fetch
        Object.keys(countdowns).forEach(k => delete countdowns[Number(k)])

        await orderStore.getAllActiveOrdersByEmail(userInfo.value.email);
        // Start countdown timers for PENDING orders
        orderList.value.forEach(order => {
            if (order.status === Status.PENDING) {
                startCountdown(order)
            }
        })
    }
}

const startCountdown = (order: IOrder) => {
    if (!order.createdAt || order.id == null) return
    const created = new Date(order.createdAt).getTime()
    const expiry = created + 10 * 60 * 1000 // 10 minutes
    const orderId = order.id
    const tick = () => {
        const remaining = Math.max(Math.floor((expiry - Date.now()) / 1000), 0)
        countdowns[orderId] = remaining
        if (remaining === 0) {
            clearInterval(timers.value[orderId])
        }
    }
    tick()
    timers.value[orderId] = window.setInterval(tick, 1000)
}

const isExpired = (order: IOrder) => {
    return (countdowns[order.id as number] ?? Infinity) === 0
}

const formattedCountdown = (order: IOrder) => {
    const secs = countdowns[order.id as number] ?? 0
    const minutes = Math.floor(secs / 60).toString().padStart(2, '0')
    const seconds = (secs % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
}

// Handle new/changed orders reactively
const orderListWatcher = computed(() =>
    orderList.value.map(o => ({ id: o.id, status: o.status }))
)
watch(orderListWatcher, (newList) => {
    newList.forEach(o => {
        if (o.status === Status.PENDING && o.id != null && !timers.value[o.id]) {
            const order = orderList.value.find(x => x.id === o.id)
            if (order) startCountdown(order)
        }
    })
}, { deep: true })

</script>
<style lang="scss" scoped src="./OrderList.scss" />
