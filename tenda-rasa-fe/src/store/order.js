import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
export const useOrderStore = defineStore('order', () => {
    const url = import.meta.env.VITE_API_BACKEND + '/orders';
    const urlPayment = import.meta.env.VITE_API_BACKEND + '/payment';
    const orderDetail = ref();
    const loading = ref(false);
    const error = ref(null);
    const orderList = ref([]);
    const orderItems = ref([]);
    const getOrderById = async (orderId) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${url}/${orderId}`);
            orderDetail.value = res.data || {};
            return orderDetail.value || null;
        }
        catch (err) {
            error.value = err.message || 'Failed to fetch order';
            return null;
        }
        finally {
            loading.value = false;
        }
    };
    const getAllActiveOrdersByEmail = async (email) => {
        loading.value = true
        error.value = null
        try {
            const res = await axios.post(`${url}/get-by-email`, { email })
            orderList.value = res.data || []
            return orderList.value
        } catch (err) {
            error.value = err.message || 'Failed to fetch orders'
            return []
        } finally {
            loading.value = false
        }
    }


    const createOrder = async (order) => {
        loading.value = true;
        error.value = null;
        try {
            await axios.post(`${url}/create-order`, order);
        }
        catch (err) {
            error.value = err.message || 'Failed to send order';
        }
        finally {
            orderItems.value = [];
            loading.value = false;
        }
    };
    const handlePayment = async (orderId, email) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${urlPayment}/${orderId}/${email}`);
            return res.data || {};
        }
        catch (err) {
            error.value = err.message || 'Failed to process payment';
            return {};
        }
        finally {
            loading.value = false;
        }
    };
    const addToCheckoutList = (menu) => {
        if (!menu.id) {
            console.error('Menu ID is required to add to checkout list');
            return;
        }
        const existingItem = orderItems.value.find(item => item.menuId === menu.id);
        const price = menu.price ?? 0;
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity ?? 0) + 1;
            existingItem.subtotal = existingItem.quantity * price;
        }
        else {
            orderItems.value.push({
                menuId: menu.id,
                quantity: 1,
                price,
                subtotal: price,
                boothName: menu.boothName,
                menuName: menu.menuName,
                menuCategory: menu.category,
                menuType: menu.menuType,
                spicinessLevel: menu.spicinessLevel,
                imageUrl: menu.imageUrl,
                estimatedMinutes: menu.estimatedMinutes
            });
        }
    };
    const removeFromCheckoutList = (menu) => {
        const index = orderItems.value.findIndex(item => item.menuId === menu.id);
        if (index !== -1) {
            const item = orderItems.value[index];
            if (item.quantity && item.quantity > 1) {
                item.quantity -= 1;
                item.subtotal = item.quantity * (item.price ?? 0);
            }
            else {
                orderItems.value.splice(index, 1);
            }
        }
    };
    return {
        loading,
        error,
        orderDetail,
        orderList,
        getAllActiveOrdersByEmail,
        getOrderById,
        createOrder,
        handlePayment,
        orderItems,
        addToCheckoutList, removeFromCheckoutList
    };
}, {
    persist: {
        key: 'order-store',
        paths: ['orderItems'],
        storage: localStorage
    }
});
