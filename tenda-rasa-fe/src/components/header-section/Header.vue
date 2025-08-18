<template>
  <header id="Header" class="sticky top-0 z-50 p-4 flex justify-between items-center h-[4rem]">
    <!-- Logo atau judul -->
    <slot name="left">
      <el-button @click="goToParent()">
        <icon-ep-arrow-left-bold class="text-primary" />
      </el-button>
    </slot>

    <!-- Navigasi atau tombol -->
    <slot name="right">
      <!-- <nav class="space-x-4">
        <a href="/" class="text-blue-600 hover:underline">Home</a>
        <a href="/about" class="text-blue-600 hover:underline">About</a>
      </nav> -->
    </slot>
  </header>
</template>

<script lang="ts" setup>
import { useRoute, useRouter, RouteRecordName } from 'vue-router';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const route = useRoute();
const router = useRouter();


//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------
const goToParent = () => {
  const segments = route.path.split('/').filter(Boolean); // remove empty segments
  if (segments.length > 0) {
    router.back();
  } else {
    router.replace({ name: 'explore-booths' as RouteRecordName });
  }
};
</script>
<style lang="scss" scoped src="./Header.scss" />
