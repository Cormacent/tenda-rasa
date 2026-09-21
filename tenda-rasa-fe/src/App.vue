<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<template>
  <div id="App">
    <!-- Admin routes use their own layout -->
    <RouterView v-if="isAdminRoute" />
    <!-- Customer routes use LayoutWrapper -->
    <LayoutWrapper v-else>
      <RouterView />
    </LayoutWrapper>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-input__inner:focus) {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}
</style>
