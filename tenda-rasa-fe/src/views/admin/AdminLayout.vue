<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/store/admin';
import { h } from 'vue';

const router = useRouter();
const route = useRoute();
const adminStore = useAdminStore();

const navItems = [
  { path: '/admin/menus', label: 'Menu', icon: '🍽️' },
  { path: '/admin/intents', label: 'Intents', icon: '💬' },
  { path: '/admin/orders', label: 'Pesanan', icon: '📦' },
];

const isActive = (path: string) => route.path.startsWith(path);

const handleLogout = () => {
  adminStore.logout();
};
</script>

<template>
  <div class="admin-layout">
    <header class="admin-header">
      <div class="header-left">
        <h1 class="header-brand">Pizza Kuzuka</h1>
        <span class="header-badge">Admin</span>
      </div>
      <div class="header-right">
        <span class="admin-name">{{ adminStore.admin?.name || 'Admin' }}</span>
        <el-button type="danger" size="small" @click="handleLogout">
          Logout
        </el-button>
      </div>
    </header>

    <div class="admin-body">
      <nav class="admin-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>

      <main class="admin-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.admin-header {
  background: #1a1a2e;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-brand {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.header-badge {
  background: #e94560;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-name {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.admin-body {
  display: flex;
  flex: 1;
}

.admin-nav {
  width: 200px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  padding: 16px 0;
  flex-shrink: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: #f5f5f5;
  color: #1a1a2e;
}

.nav-item.active {
  background: #fff0f0;
  color: #e94560;
  border-left-color: #e94560;
}

.nav-icon {
  font-size: 18px;
}

.admin-content {
  flex: 1;
  padding: 24px;
  overflow-x: auto;
}
</style>
