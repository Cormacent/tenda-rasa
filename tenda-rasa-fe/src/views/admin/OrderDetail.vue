<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { adminOrderApi, type Order } from '@/api/admin';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

const order = ref<Order | null>(null);
const loading = ref(false);
const updating = ref(false);

const statusOptions = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];

const statusTypeMap: Record<string, string> = {
  pending: 'warning',
  confirmed: 'primary',
  preparing: 'info',
  ready: 'success',
  completed: 'success',
  cancelled: 'danger',
};

const fetchOrder = async () => {
  loading.value = true;
  try {
    order.value = await adminOrderApi.getOrder(Number(route.params.id));
  } catch {
    ElMessage.error('Gagal mengambil detail pesanan');
    router.push('/admin/orders');
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (status: string) => {
  if (!order.value) return;
  updating.value = true;
  try {
    order.value = await adminOrderApi.updateOrderStatus(order.value.id, status);
    ElMessage.success('Status pesanan diupdate');
  } catch {
    ElMessage.error('Gagal update status');
  } finally {
    updating.value = false;
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

const formatPrice = (price: number) => `Rp ${Number(price).toLocaleString('id-ID')}`;

onMounted(() => {
  fetchOrder();
});
</script>

<template>
  <AdminLayout>
    <div v-loading="loading">
      <div class="page-header">
        <el-button text @click="router.push('/admin/orders')">
          <ArrowLeft class="btn-icon" />
          Kembali
        </el-button>
        <h2 class="page-title">Detail Pesanan #{{ order?.id }}</h2>
      </div>

      <div v-if="order" class="order-detail">
        <div class="info-card">
          <div class="info-row">
            <span class="info-label">Status</span>
            <el-select
              :model-value="order.status"
              @change="updateStatus"
              :loading="updating"
              class="status-select"
            >
              <el-option v-for="s in statusOptions" :key="s" :label="s" :value="s" />
            </el-select>
            <el-tag :type="statusTypeMap[order.status] || 'info'" size="small">
              {{ order.status }}
            </el-tag>
          </div>
          <div class="info-row">
            <span class="info-label">Nama</span>
            <span>{{ order.name || '-' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span>{{ order.email }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Tanggal</span>
            <span>{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">QR Code</span>
            <code>{{ order.qrcode }}</code>
          </div>
          <div class="info-row">
            <span class="info-label">Estimasi</span>
            <span>{{ order.estimatedMinutes }} menit</span>
          </div>
          <div class="info-row total-row">
            <span class="info-label">Total</span>
            <span class="total-price">{{ formatPrice(order.totalPrice) }}</span>
          </div>
        </div>

        <div class="items-card">
          <h3 class="section-title">Item Pesanan</h3>
          <div v-if="order.order_items?.length" class="items-list">
            <div v-for="item in order.order_items" :key="item.id" class="order-item">
              <div class="item-info">
                <span class="item-name">{{ item.menuName }}</span>
                <span class="item-qty">x{{ item.quantity }}</span>
              </div>
              <span class="item-price">{{ formatPrice(item.subtotal) }}</span>
            </div>
          </div>
          <div v-else class="no-items">Tidak ada item</div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import AdminLayout from './AdminLayout.vue';
export default {
  components: { ArrowLeft, AdminLayout },
};
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.btn-icon {
  margin-right: 4px;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.order-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info-card,
.items-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  color: #999;
  font-size: 13px;
  min-width: 80px;
}

.status-select {
  width: 130px;
  margin-right: 8px;
}

.total-row .info-label {
  font-weight: 600;
  color: #333;
}

.total-price {
  font-size: 20px;
  font-weight: 700;
  color: #e94560;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 16px 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-info {
  display: flex;
  gap: 8px;
  align-items: center;
}

.item-name {
  font-weight: 500;
}

.item-qty {
  color: #999;
  font-size: 13px;
}

.item-price {
  font-weight: 600;
}

.no-items {
  color: #999;
  text-align: center;
  padding: 20px;
}
</style>
