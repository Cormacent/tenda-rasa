<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { adminOrderApi, type Order } from '@/api/admin';
import { ElMessage } from 'element-plus';

const router = useRouter();

const orders = ref<Order[]>([]);
const total = ref(0);
const loading = ref(false);
const filters = ref({
  status: '',
  startDate: '',
  endDate: '',
});

const statusOptions = [
  { label: 'Semua', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Preparing', value: 'preparing' },
  { label: 'Ready', value: 'ready' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

const statusTypeMap: Record<string, string> = {
  pending: 'warning',
  confirmed: 'primary',
  preparing: 'info',
  ready: 'success',
  completed: 'success',
  cancelled: 'danger',
};

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await adminOrderApi.getOrders({
      status: filters.value.status || undefined,
      startDate: filters.value.startDate || undefined,
      endDate: filters.value.endDate || undefined,
    });
    orders.value = res.orders;
    total.value = res.total;
  } catch {
    ElMessage.error('Gagal mengambil data pesanan');
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatPrice = (price: number) => {
  return `Rp ${Number(price).toLocaleString('id-ID')}`;
};

onMounted(() => {
  fetchOrders();
});
</script>

<template>
  <AdminLayout>
    <div class="page-header">
      <h2 class="page-title">Daftar Pesanan</h2>
    </div>

    <div class="filters">
      <el-select v-model="filters.status" placeholder="Status" clearable @change="fetchOrders">
        <el-option v-for="opt in statusOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
      </el-select>

      <el-date-picker
        v-model="filters.startDate"
        type="date"
        placeholder="Dari tanggal"
        format="DD/MM/YYYY"
        value-format="YYYY-MM-DD"
        @change="fetchOrders"
      />

      <el-date-picker
        v-model="filters.endDate"
        type="date"
        placeholder="Sampai tanggal"
        format="DD/MM/YYYY"
        value-format="YYYY-MM-DD"
        @change="fetchOrders"
      />

      <el-button @click="filters = { status: '', startDate: '', endDate: '' }; fetchOrders()">
        Reset
      </el-button>
    </div>

    <div class="summary-bar">
      <span>Total: <strong>{{ total }}</strong> pesanan</span>
    </div>

    <el-table v-loading="loading" :data="orders" stripe class="order-table" @row-click="(row: Order) => router.push(`/admin/orders/${row.id}`)">
      <el-table-column label="ID" width="70">
        <template #default="{ row }">#{{ row.id }}</template>
      </el-table-column>

      <el-table-column label="Tanggal" width="170">
        <template #default="{ row }">
          {{ formatDate(row.createdAt) }}
        </template>
      </el-table-column>

      <el-table-column label="Nama" min-width="130">
        <template #default="{ row }">{{ row.name || '-' }}</template>
      </el-table-column>

      <el-table-column label="Email" min-width="180">
        <template #default="{ row }">{{ row.email }}</template>
      </el-table-column>

      <el-table-column label="Total" width="130">
        <template #default="{ row }">{{ formatPrice(row.totalPrice) }}</template>
      </el-table-column>

      <el-table-column label="Status" width="110">
        <template #default="{ row }">
          <el-tag :type="statusTypeMap[row.status] || 'info'" size="small">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Items" width="80" align="center">
        <template #default="{ row }">
          {{ row.order_items?.length || 0 }}
        </template>
      </el-table-column>
    </el-table>

    <div v-if="!loading && orders.length === 0" class="empty-state">
      <p>Belum ada pesanan</p>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import AdminLayout from './AdminLayout.vue';
export default {
  components: { AdminLayout },
};
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.summary-bar {
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.order-table {
  background: white;
  border-radius: 8px;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  background: white;
  border-radius: 8px;
  margin-top: 16px;
}
</style>
