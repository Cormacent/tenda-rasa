// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAdminStore } from '@/store/admin';

// Helper: check admin auth
const requireAdmin = (_to: unknown, _from: unknown, next: (arg?: { name: string }) => void) => {
  const adminStore = useAdminStore();
  if (!adminStore.isAuthenticated()) {
    next({ name: 'admin-login' });
  } else {
    next();
  }
};

const routes = [
  // ─── Customer Routes ───────────────────────────────────
  {
    path: '/',
    component: () => import('@/views/introduction/Introduction.vue'),
    name: 'introduction',
    meta: { title: 'Introduction', showHeader: false, showFooter: false, showBackground: true },
  },
  {
    path: '/explore-booths',
    component: () => import('@/views/explore-booth/ExploreBooth.vue'),
    name: 'explore-booths',
    meta: { title: '', showHeader: false, showFooter: true, showBackground: true, showButtonNavigation: true },
  },
  {
    path: '/explore-booths/booth-detail/:menuId',
    component: () => import('@/views/booth-detail/BoothDetail.vue'),
    name: 'booth-detail',
    meta: { title: '', showHeader: false, showFooter: true, showBackground: true },
  },
  {
    path: '/checkout',
    component: () => import('@/views/checkout/Checkout.vue'),
    name: 'checkout',
    meta: { title: 'Keranjang', showHeader: true, showFooter: true, showBackground: true },
  },
  {
    path: '/order-list',
    component: () => import('@/views/order/OrderList.vue'),
    name: 'order-list',
    meta: { title: 'Daftar Pesanan', showHeader: true, showFooter: true, showBackground: true },
  },
  {
    path: '/order-detail',
    component: () => import('@/views/order/order-detail/OrderDetail.vue'),
    name: 'order-detail',
    meta: { title: 'Rincian Pesanan', showHeader: true, showFooter: true, showBackground: true },
  },
  {
    path: '/order-detail/:orderId',
    component: () => import('@/views/order/order-detail/OrderDetail.vue'),
    name: 'order-detail-by-id',
    meta: { title: 'Rincian Pesanan', showHeader: true, showFooter: true, showBackground: true },
  },
  {
    path: '/room-chat',
    component: () => import('@/views/room-chat/RoomChat.vue'),
    name: 'room-chat',
    meta: { title: 'Chat', showHeader: true, showFooter: true, showBackground: true },
  },
  {
    path: '/payment-gateway/:orderId/:email/:name',
    component: () => import('@/views/payment/Payment.vue'),
    name: 'payment-gateway',
    meta: { title: 'Chat', showHeader: false, showFooter: false, showBackground: true },
  },

  // ─── Admin Routes ───────────────────────────────────────
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/Login.vue'),
  },
  {
    path: '/admin',
    redirect: '/admin/menus',
  },
  {
    path: '/admin/menus',
    name: 'admin-menus',
    component: () => import('@/views/admin/MenuList.vue'),
    beforeEnter: requireAdmin,
  },
  {
    path: '/admin/menus/new',
    name: 'admin-menu-new',
    component: () => import('@/views/admin/MenuForm.vue'),
    beforeEnter: requireAdmin,
  },
  {
    path: '/admin/menus/:id/edit',
    name: 'admin-menu-edit',
    component: () => import('@/views/admin/MenuForm.vue'),
    beforeEnter: requireAdmin,
  },
  {
    path: '/admin/intents',
    name: 'admin-intents',
    component: () => import('@/views/admin/IntentList.vue'),
    beforeEnter: requireAdmin,
  },
  {
    path: '/admin/intents/new',
    name: 'admin-intent-new',
    component: () => import('@/views/admin/IntentForm.vue'),
    beforeEnter: requireAdmin,
  },
  {
    path: '/admin/intents/:code/edit',
    name: 'admin-intent-edit',
    component: () => import('@/views/admin/IntentForm.vue'),
    beforeEnter: requireAdmin,
  },
  {
    path: '/admin/orders',
    name: 'admin-orders',
    component: () => import('@/views/admin/OrderList.vue'),
    beforeEnter: requireAdmin,
  },
  {
    path: '/admin/orders/:id',
    name: 'admin-order-detail',
    component: () => import('@/views/admin/OrderDetail.vue'),
    beforeEnter: requireAdmin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Redirect admin-login if already authenticated
router.beforeEach((to, _from, next) => {
  const adminStore = useAdminStore();
  if (to.name === 'admin-login' && adminStore.isAuthenticated()) {
    next({ name: 'admin-menus' });
  } else {
    next();
  }
});

export default router;
