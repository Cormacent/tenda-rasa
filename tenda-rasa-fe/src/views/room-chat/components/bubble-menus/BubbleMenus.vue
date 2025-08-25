<template>
    <section id="BubbleMenus" class="max-w-md mx-auto">
        <p class="text-sm mb-3">
            {{ message }}
        </p>

        <div v-if="menus?.length" class="flex flex-wrap gap-2">
            <el-button v-for="menu in menus" :key="menu.id" size="small" plain
                class=" rounded-full bg-white border border-primary text-primary hover:bg-primary hover:text-white transition"
                style="margin-left: 0 !important;" @click="onSelect(menu)">
                <span class="text-md text-black">{{ menu.menuName }}</span>
            </el-button>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { IChatbot } from '@/models/IChatbot';
import { computed } from 'vue';
import { IMenu } from '@/models/IMenu';

const props = defineProps<{ chat: IChatbot }>();
const emit = defineEmits<{
    (e: 'select-menu', menu: IMenu): void
}>()

// 🔍 Computed
const message = computed(() => props.chat?.message?.chat ?? '');
const menus = computed(() => props.chat?.message?.menus ?? []);

// 🎯 Actions
function onSelect(menu: IMenu) {
    emit('select-menu', menu)
}

</script>

<style scoped>
/* Optional: Tailwind handles most styling */
</style>