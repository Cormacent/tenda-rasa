import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { usePageRequest } from '@/utils/helper';
export const useMenuStore = defineStore('menu', () => {
    const url = import.meta.env.VITE_API_BACKEND + '/menus';
    const menuDetail = ref({});
    const loading = ref(false);
    const error = ref(null);
    const menuList = ref([]);
    const { pageInfo, requestPayload, resetFilters, updatePageInfoFromResponse } = usePageRequest({});
    const getMenuById = async (menuId) => {
        if (!menuId) {
            error.value = 'Menu ID is required';
            return null;
        }
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${url}/${menuId}`);
            menuDetail.value = res.data || {};
            return menuDetail.value || null;
        }
        catch (err) {
            error.value = err.message || 'Failed to fetch menu';
            return null;
        }
        finally {
            loading.value = false;
        }
    };
    const getAllMenus = async () => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${url}`);
            menuList.value = res.data || [];
            return menuList.value;
        }
        catch (err) {
            error.value = err.message || 'Failed to fetch menus';
            return [];
        }
        finally {
            loading.value = false;
        }
    };
    const getMenuPage = async () => {
        try {
            const res = await axios.post(`${url}/page`, requestPayload.value);
            updatePageInfoFromResponse(res.data.data);
            return res.data;
        }
        catch (err) {
            console.error('❌ getMenuPage error:', err);
            return {
                data: [],
                total: 0,
                error: err.response?.data?.message || err.message || 'Unknown error'
            };
        }
    };
    return {
        menuDetail,
        loading,
        error,
        getAllMenus,
        getMenuById,
        menuList, getMenuPage, pageInfo, resetFilters
    };
});
