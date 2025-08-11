<template>
    <section id="SplashScreen"
        class="relative w-screen h-screen bg-white overflow-hidden flex items-center justify-center">
        <!-- Background Gradient Image -->
        <img :src="importImage('bg-tenda-rasa.svg')" alt="Tenda Rasa"
            class="absolute inset-0 w-full h-full object-cover z-0"
            style="mask-image: linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 80%)"
            @error="console.error('Image not found:', importImage('bg-tenda-rasa.svg'))" />

        <!-- Centered Logo Image -->
        <img :src="importImage('splash-screen-logo.svg')" alt="Tenda Rasa"
            class="z-10 w-auto h-auto max-w-xs pointer-events-none"
            @error="console.error('Image not found:', importImage('splash-screen-logo.svg'))" />
    </section>
</template>

<script lang="ts" setup>
import { importImage } from '@/utils/helper';
</script>
<style lang="scss" scoped src="./SplashScreen.scss" />
