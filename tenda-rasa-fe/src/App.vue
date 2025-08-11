<script setup lang="ts">
import Main from '@/views/Main.vue';
import { onMounted, ref } from 'vue';

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})

</script>

<template>
  <div id="app">
    <div id="background"></div>
    <div id="header-section"></div>
    <Main />
    <div id="footer-section"></div>
  </div>

</template>

<style scoped>
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
</style>
