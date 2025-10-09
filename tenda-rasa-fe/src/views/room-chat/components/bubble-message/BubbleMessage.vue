<template>
    <section id="BubbleMessage" class="text-base font-base">
        {{ message }}
    </section>
</template>

<script lang="ts" setup>
import { IChatbot } from '@/models/IChatbot';
import { computed } from 'vue';

const props = defineProps<{ chat: IChatbot }>()
//----------------------------------------
// 🧩 State Variables & Stores
//----------------------------------------

//----------------------------------------
// 🔍 Computed Properties
//----------------------------------------
const message = computed(() => props.chat?.message?.chat ?? '')

//----------------------------------------
// 🎯 Watchers
//----------------------------------------

//----------------------------------------
// 🚀 Lifecycle Hooks
//----------------------------------------

//----------------------------------------
// 🛠️ Utility / Custom Functions
//----------------------------------------


</script>
<style lang="scss" scoped src="./BubbleMessage.scss" />
