<template>
    <section id="BubbleMenus" class="p-4 rounded-lg bg-gray-50 shadow-md max-w-md mx-auto">
        <p class="text-sm text-gray-700 mb-3">
            {{ message }}
        </p>

        <div v-if="menus?.length" class="flex flex-col gap-2">
            <el-button v-for="menu in menus" :key="menu.id" type="primary"  size="small" class="justify-start" plain border-primary
                @click="onSelect(menu)">
                <span class="text-lg mr-2">{{ menu.menuName }}</span>
                {{ menu.menuName }}
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