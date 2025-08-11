import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { IOrder } from '@/models/IOrder'

export const useOrderStore = defineStore('order', () => {
    const url = import.meta.env.VITE_API_BACKEND + '/orders';
    const urlPayment = import.meta.env.VITE_API_BACKEND + '/payment';
    const orderDetail = ref<IOrder>()
    const loading = ref(false)
    const error = ref<string | null>(null)
    const orderList = ref<IOrder[]>([])

    const getOrderById = async (orderId: number): Promise<IOrder | null> => {
        loading.value = true
        error.value = null
        try {
            const res = await axios.get(`${url}/orders/${orderId}`)
            orderDetail.value = res.data || {}
            return orderDetail.value || null
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch order'
            return null
        } finally {
            loading.value = false
        }
    }

    const getAllOrdersByEmail = async (email: string): Promise<IOrder[]> => {
        loading.value = true
        error.value = null
        try {
            const res = await axios.get(`${url}/orders`, { params: { email } })
            orderList.value = res.data || []
            return orderList.value
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch orders'
            return []
        } finally {
            loading.value = false
        }
    }


    const createOrder = async (order: IOrder) => {
        loading.value = true
        error.value = null
        try {
            await axios.post(`${url}/orders`, order)
        } catch (err: any) {
            console.log("🚀 ~ createOrder ~ err:", err)
            error.value = err.message || 'Failed to send order'
        } finally {
            loading.value = false
        }
    }

    const handlePayment = async (orderId: number, email: string) => {
        loading.value = true
        error.value = null
        try {
            const res = await axios.get(`${urlPayment}/payment`, { params: { orderId, email } })
            return res.data || {}
        }
        catch (err: any) {
            console.log("🚀 ~ handlePayment ~ err:", err)
            error.value = err.message || 'Failed to process payment'
            return {}
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        orderDetail,
        orderList,
        getAllOrdersByEmail,
        getOrderById,
        createOrder,
        handlePayment
    }
})
