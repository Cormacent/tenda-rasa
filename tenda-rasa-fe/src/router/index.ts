import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/views/introduction/Introduction.vue'),
        name: 'introduction',
        meta: { title: 'Introduction', icon: 'ep:guide', showHeader: false, showFooter: false, showBackground: true }
    },
    {
        path: '/explore-booths',
        component: () => import('@/views/explore-booth/ExploreBooth.vue'),
        name: 'explore-booths',
        meta: { title: '', icon: 'ep:guide', showHeader: false, showFooter: true, showBackground: true, showButtonNavigation: true }
    },

    {
        path: '/explore-booths/booth-detail/:menuId',
        component: () => import('@/views/booth-detail/BoothDetail.vue'),
        name: 'booth-detail',
        meta: { title: '', icon: 'ep:guide', showHeader: false, showFooter: true, showBackground: true }
    },
    {
        path: '/checkout',
        component: () => import('@/views/checkout/Checkout.vue'),
        name: 'checkout',
        meta: { title: 'Keranjang', icon: 'ep:guide', showHeader: true, showFooter: true, showBackground: true }
    },

    {
        path: '/order-list',
        component: () => import('@/views/order/OrderList.vue'),
        name: 'order-list',
        meta: { title: 'Daftar Pesanan', icon: 'ep:guide', showHeader: true, showFooter: true, showBackground: true }
    },
    {
        path: '/order-detail',
        component: () => import('@/views/order/order-detail/OrderDetail.vue'),
        name: 'order-detail',
        meta: { title: 'Rincian Pesanan', icon: 'ep:guide', showHeader: true, showFooter: true, showBackground: true }
    },
    {
        path: '/order-detail/:orderId',
        component: () => import('@/views/order/order-detail/OrderDetail.vue'),
        name: 'order-detail-by-id',
        meta: { title: 'Rincian Pesanan', icon: 'ep:guide', showHeader: true, showFooter: true, showBackground: true }
    },
    {
        path: '/room-chat',
        component: () => import('@/views/room-chat/RoomChat.vue'),
        name: 'room-chat',
        meta: { title: 'Chat', icon: 'ep:guide', showHeader: true, showFooter: true, showBackground: true }
    },
    {
        path: '/payment-gateway/:orderId/:email/:name',
        component: () => import('@/views/payment/Payment.vue'),
        name: 'payment-gateway',
        meta: { title: 'Chat', icon: 'ep:guide', showHeader: false, showFooter: false, showBackground: true }
    }
]
export default createRouter({
    history: createWebHistory(),
    routes,
});
