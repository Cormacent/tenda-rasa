import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/views/introduction/Introduction.vue'),
        name: 'introduction',
        meta: { title: 'Introduction', icon: 'ep:guide', noHeader: true, noFooter: true, noBackground: false }
    },
    {
        path: '/explore-booths',
        component: () => import('@/views/explore-booth/ExploreBooth.vue'),
        name: 'explore-booths',
        meta: { title: 'Explore Booth', icon: 'ep:guide', noHeader: true, noFooter: false, noBackground: false }
    },


    {
        path: '/booth-detail/:boothId',
        component: () => import('@/views/booth-detail/BoothDetail.vue'),
        name: 'booth-detail/:boothId',
        meta: { title: '', icon: 'ep:guide', noHeader: false, noFooter: false, noBackground: false }
    },
    {
        path: '/order-detail',
        component: () => import('@/views/order/OrderDetail.vue'),
        name: 'order-detail',
        meta: { title: '', icon: 'ep:guide', noHeader: false, noFooter: false, noBackground: false }
    },
    {
        path: '/order-status',
        component: () => import('@/views/order-status/OrderStatus.vue'),
        name: 'order-status',
        meta: { title: '', icon: 'ep:guide', noHeader: false, noFooter: false, noBackground: false }
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
