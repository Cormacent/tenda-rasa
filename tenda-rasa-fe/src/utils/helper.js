import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export function importImage(path) {
    return new URL(`/src/assets/${path}`, import.meta.url).href;
}
export function generateFiltersFromModel(model, exclude = []) {
    const filters = {};
    for (const key of Object.keys(model)) {
        if (exclude.includes(key))
            continue;
        const value = model[key];
        if (typeof value === 'number') {
            filters[`${String(key)}_min`] = null;
            filters[`${String(key)}_max`] = null;
        }
        else if (typeof value === 'boolean') {
            filters[String(key)] = null;
        }
        else {
            filters[String(key)] = '';
        }
    }
    return filters;
}
export function usePageRequest(model, options) {
    const route = useRoute();
    const router = useRouter();
    const pageInfo = ref({
        limit: Number(route.query.limit) || options?.defaultLimit || 10,
        offset: Number(route.query.offset) || options?.defaultOffset || 0,
        sortBy: route.query.sortBy || options?.defaultSortBy || 'createdAt',
        sortOrder: route.query.sortOrder === 'asc' ? 'asc' : 'desc',
        filters: generateFiltersFromModel(model, options?.exclude || []),
        data: [],
        pagination: {}
    });
    // Apply query params to filters
    for (const key in pageInfo.value.filters) {
        const queryValue = route.query[key];
        if (queryValue !== undefined) {
            pageInfo.value.filters[key] = typeof pageInfo.value.filters[key] === 'number'
                ? Number(queryValue)
                : queryValue;
        }
    }
    const requestPayload = computed(() => ({
        limit: pageInfo.value.limit,
        offset: pageInfo.value.offset,
        sortBy: pageInfo.value.sortBy,
        sortOrder: pageInfo.value.sortOrder,
        filters: Object.fromEntries(Object.entries(pageInfo.value.filters).filter(([_, v]) => v !== null && v !== ''))
    }));
    function syncToQuery() {
        router.replace({
            query: {
                ...route.query,
                limit: String(pageInfo.value.limit),
                offset: String(pageInfo.value.offset),
                sortBy: pageInfo.value.sortBy,
                sortOrder: pageInfo.value.sortOrder,
                ...Object.fromEntries(Object.entries(pageInfo.value.filters).filter(([_, v]) => v !== null && v !== ''))
            }
        });
    }
    function resetFilters() {
        pageInfo.value.filters = generateFiltersFromModel(model, options?.exclude || []);
    }
    function updatePageInfoFromResponse(res) {
        pageInfo.value.data = res.data;
        pageInfo.value.pagination = res.pagination;
    }
    return {
        pageInfo,
        requestPayload,
        syncToQuery,
        resetFilters,
        updatePageInfoFromResponse
    };
}
export const formatPrice = (value) => value.toLocaleString('id-ID', { minimumFractionDigits: 0 });
export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
