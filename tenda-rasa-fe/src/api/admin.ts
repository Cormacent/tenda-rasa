import api from '@/api/api';
import { useAdminStore } from '@/store/admin';

// Create a separate API instance for admin routes with auth header
const getAdminApi = () => {
  const adminStore = useAdminStore();
  const instance = api;

  if (adminStore.token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${adminStore.token}`;
  }

  return instance;
};

export interface MenuItem {
  id: number;
  boothName: string;
  menuName: string;
  description: string;
  price: number;
  tags: string[];
  category: string;
  menuType: string;
  spicinessLevel: number;
  imageUrl: string;
  stock: number;
  isAvailable: boolean;
  estimatedMinutes: number;
  isFavorite: boolean;
  createdBy: string;
  updatedBy: string;
}

export interface MenuFormData {
  menuName: string;
  description: string;
  price: number;
  category: string;
  menuType: string;
  spicinessLevel: number;
  stock: number;
  estimatedMinutes: number;
  tags: string;
  boothName: string;
  isAvailable: boolean;
  isFavorite: boolean;
  image?: File;
}

export const adminMenuApi = {
  getMenus: async (): Promise<MenuItem[]> => {
    const response = await getAdminApi().get('/admin/menus');
    return response.data.menus;
  },

  getMenu: async (id: number): Promise<MenuItem> => {
    const response = await getAdminApi().get(`/admin/menus/${id}`);
    return response.data.menu;
  },

  createMenu: async (data: FormData): Promise<MenuItem> => {
    const response = await getAdminApi().post('/admin/menus', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.menu;
  },

  updateMenu: async (id: number, data: FormData): Promise<MenuItem> => {
    const response = await getAdminApi().put(`/admin/menus/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.menu;
  },

  deleteMenu: async (id: number): Promise<void> => {
    await getAdminApi().delete(`/admin/menus/${id}`);
  },
};

// Intent API
export interface Intent {
  code: string;
  label: string;
  promptInstruction: string;
  isActive: boolean;
  sortOrder: number;
}

export interface IntentFormData {
  code: string;
  label: string;
  promptInstruction: string;
  isActive: boolean;
  sortOrder: number;
}

export const adminIntentApi = {
  getIntents: async (): Promise<Intent[]> => {
    const response = await getAdminApi().get('/admin/intents');
    return response.data.intents;
  },

  createIntent: async (data: IntentFormData): Promise<Intent> => {
    const response = await getAdminApi().post('/admin/intents', data);
    return response.data.intent;
  },

  updateIntent: async (code: string, data: Partial<IntentFormData>): Promise<Intent> => {
    const response = await getAdminApi().put(`/admin/intents/${code}`, data);
    return response.data.intent;
  },

  deleteIntent: async (code: string): Promise<void> => {
    await getAdminApi().delete(`/admin/intents/${code}`);
  },
};

// Order API
export interface OrderItem {
  id: number;
  menuId: number;
  menuName: string;
  menuCategory: string;
  menuType: string;
  spicinessLevel: number;
  imageUrl: string;
  estimatedMinutes: number;
  subtotal: number;
  quantity: number;
  price: number;
  remarks: string;
  boothName: string;
}

export interface Order {
  id: number;
  email: string;
  name: string;
  qrcode: string;
  status: string;
  estimatedMinutes: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  order_items: OrderItem[];
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  limit: number;
  offset: number;
}

export interface OrderFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export const adminOrderApi = {
  getOrders: async (filters?: OrderFilters): Promise<OrdersResponse> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.limit) params.append('limit', String(filters.limit));
    if (filters?.offset) params.append('offset', String(filters?.offset ?? 0));

    const response = await getAdminApi().get(`/admin/orders?${params.toString()}`);
    return response.data;
  },

  getOrder: async (id: number): Promise<Order> => {
    const response = await getAdminApi().get(`/admin/orders/${id}`);
    return response.data.order;
  },

  updateOrderStatus: async (id: number, status: string): Promise<Order> => {
    const response = await getAdminApi().patch(`/admin/orders/${id}/status`, { status });
    return response.data.order;
  },
};
