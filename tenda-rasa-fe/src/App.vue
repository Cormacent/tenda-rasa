<script setup lang="ts">
import { onMounted, ref } from 'vue';

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})

</script>

<template>
  <div id="App">
    <LayoutWrapper>
      <RouterView />
    </LayoutWrapper>
  </div>

</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

:deep(.el-input__inner:focus) {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}
</style>
