<template>
    <div v-if="!$route.meta?.noBackground" class="bg-fade"
        :style="{ backgroundImage: `url(${importImage('bg-tenda-rasa.svg')})` }"></div>
    <div class="flex" v-if="!$route.meta?.noHeader">
        <el-button @click="goToParent()">
            <icon-ep-arrow-left-bold class="text-primary" />

        </el-button>
    </div>

    <div class="relative z-10 mx-auto ">
        <router-view />
    </div>

    <Teleport to="#footer-section" v-if="!$route.meta?.noFooter">
        <footer class="text-center py-4">
            <p class="text-sm text-gray-700">© 2023 Tenda Rasa. All rights reserved.</p>
        </footer>

    </Teleport>
</template>

<script setup lang="ts">
import { importImage } from '@/utils/helper';
import { onMounted, onUnmounted, ref } from 'vue';
import { RouteRecordName, useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
let isMounted = ref<boolean>(false);

const goToParent = () => {
    if (route.meta.parentRoute) {
        router.push({ name: 'dashboard-home' as RouteRecordName })
    }

};

onMounted(() => {
    isMounted.value = true;
    console.log('✅ App mounted');
});

onUnmounted(() => {
    isMounted.value = false;
    const bg = document.getElementById('background');
    if (bg) bg.innerHTML = '';

    console.log('❌ App unmounted');
});

</script>
<style lang="scss" scoped>
.bg-fade {
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100%;
    position: relative;
    position: fixed;
    inset: 0;
    z-index: -10;
    // -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0) 70%);
    // mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0) 70%);
}
</style>