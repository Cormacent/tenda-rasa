<template>
  <header id="Header" class="sticky top-0 z-50 p-4 flex items-center h-[4rem] bg-white">
    <!-- Left slot -->
    <div class="flex-shrink-0">
      <slot name="left">
        <el-button @click="goToParent()">
          <icon-ep-arrow-left-bold class="text-primary" />
        </el-button>
      </slot>
    </div>

    <!-- Center title -->
    <div class="flex-1 text-center">
      <p class="text-2xl font-bold">
        <span class=" ml-[-3rem]">
          {{ headerTitle }}
        </span>
      </p>
    </div>

    <!-- Right slot -->
    <div class="flex-shrink-0">
      <slot name="right" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter, RouteRecordName } from 'vue-router';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const route = useRoute();
const router = useRouter();

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const headerTitle = computed(() => route.meta?.title);

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

  console.log("🚀 ~ goToParent ~ window.history.length:", window.history.length)
  if (window.history.length > 1 || segments.length > 0) {
    router.back(); // go to previous history
  } else {
    router.replace({ name: 'explore-booths' as RouteRecordName }); // fallback
  }
};
</script>
<style lang="scss" scoped src="./Header.scss" />
