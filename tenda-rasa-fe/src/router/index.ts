import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/views/introduction/Introduction.vue'),
        name: 'introduction',
        meta: { title: 'Introduction', icon: 'ep:guide', showHeader: true, showFooter: true, showBackground: true }
    },
    {
        path: '/explore-booths',
        component: () => import('@/views/explore-booth/ExploreBooth.vue'),
        name: 'explore-booths',
        meta: { title: 'Explore Booth', icon: 'ep:guide', showHeader: true, showFooter: true, showBackground: true, showButtonNavigation: true }
    },

    {
        path: '/booth-detail/:menuId',
        component: () => import('@/views/booth-detail/BoothDetail.vue'),
        name: 'booth-detail',
        meta: { title: '', icon: 'ep:guide', showHeader: false, showFooter: false, showBackground: true }
    },
    {
        path: '/checkout',
        component: () => import('@/views/checkout/Checkout.vue'),
        name: 'checkout',
        meta: { title: '', icon: 'ep:guide', showHeader: false, showFooter: false, showBackground: true }
    },
    
    {
        path: '/order-list',
        component: () => import('@/views/order/OrderList.vue'),
        name: 'order-list',
        meta: { title: '', icon: 'ep:guide', showHeader: false, showFooter: false, showBackground: true }
    },
    {
        path: '/order-detail',
        component: () => import('@/views/order/order-detail/OrderDetail.vue'),
        name: 'order-detail',
        meta: { title: '', icon: 'ep:guide', showHeader: false, showFooter: false, showBackground: true }
    },
    {
        path: '/order-detail/:orderId',
        component: () => import('@/views/order/order-detail/OrderDetail.vue'),
        name: 'order-detail-by-id',
        meta: { title: '', icon: 'ep:guide', showHeader: false, showFooter: false, showBackground: true }
    },
    {
        path: '/room-chat',
        component: () => import('@/views/room-chat/RoomChat.vue'),
        name: 'room-chat',
        meta: { parentRoute: 'introduction' }
    }
]
export default createRouter({
    history: createWebHistory(),
    routes,
});
