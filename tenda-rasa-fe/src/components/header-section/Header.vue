<template>
  <header id="Header" class="sticky top-0 z-50 p-4 flex items-center bg-transparent h-[4rem]">
    <!-- Left slot -->
    <div class="flex-shrink-0">
      <slot name="left">
        <el-button @click="goToParent()" class="rounded-lg"
          style="background-color: var(--el-color-primary-light-3); border-color: var(--el-color-primary-light-3);">
          <icon-ep-arrow-left-bold class="text-primary" />
        </el-button>
      </slot>
    </div>

    <!-- Center title -->
    <div class="flex-1 text-center">
      <p class="text-2xl font-bold">
        <span :class="!hasUser ? 'ml-[-3rem]' : ''">
          {{ headerTitle }}
        </span>
      </p>
    </div>

    <!-- Right slot -->
    <div class="flex-shrink-0">
      <slot name="right">
        <el-button v-if="hasUser" @click="logout()" class="rounded-lg"
          style="background-color: var(--el-color-primary-light-3); border-color: var(--el-color-primary-light-3);">
          <icon-ep-switch-button class="text-primary" />
        </el-button>
      </slot>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useUserStore, } from '@/store/user';
import { computed } from 'vue';
import { useRoute, useRouter, RouteRecordName } from 'vue-router';


//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const route = useRoute();
const router = useRouter();
const { confirmLogout, userInfo } = useUserStore();

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const headerTitle = computed(() => route.meta?.title);
const hasUser = computed(() => !!userInfo.email)
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
  const backPath = window.history.state?.back;

  if (backPath) {
    router.back();
  } else {
    router.replace({ name: 'explore-booths' as RouteRecordName });
  }
};


const logout = () => {
  console.log("🚀 ~ logout ~ userInfo:", userInfo)
  confirmLogout(router)
}
</script>
<style lang="scss" scoped src="./Header.scss" />
