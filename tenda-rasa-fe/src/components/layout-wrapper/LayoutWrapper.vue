<template>
    <section id="LayoutWrapper" class="flex flex-col min-h-screen">
        <Teleport to="#background">
            <div v-if="showBackground && isMounted" class="bg-fade"
                :style="{ backgroundImage: `url(${importImage('bg-tenda-rasa.svg')})` }"></div>
        </Teleport>

        <Header v-if="showHeader">
            <div class="flex">
                <!-- Header content -->
            </div>
        </Header>

        <main class="flex-1 flex flex-col">
            <slot />
        </main>

        <Footer v-if="showFooter">
            <BottomNavbar v-if="showButtonNavigation" />
            <p v-if="!showButtonNavigation" class="text-center py-4 text-sm text-gray-500">
                © 2023 Tenda Rasa. All rights reserved.
            </p>
        </Footer>
    </section>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { RouteRecordName, useRoute, useRouter } from 'vue-router';
import { importImage } from '@/utils/helper';
import Header from '../header-section/Header.vue';
import Footer from '../footer-section/Footer.vue';
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------
const route = useRoute();
const isMounted = ref<boolean>(false);

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const showHeader = computed(() => route.meta?.showHeader !== false);
const showFooter = computed(() => route.meta?.showFooter !== false);
const showBackground = computed(() => route.meta?.showBackground !== false);
const showButtonNavigation = computed(() => route.meta?.showButtonNavigation !== false);

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------
onMounted(() => {
    isMounted.value = true;
});

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------


</script>
<style lang="scss" scoped src="./LayoutWrapper.scss" />
