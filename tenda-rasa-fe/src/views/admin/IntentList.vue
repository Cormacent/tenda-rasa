<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { adminIntentApi, type Intent } from '@/api/admin';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();

const intents = ref<Intent[]>([]);
const loading = ref(false);

const fetchIntents = async () => {
  loading.value = true;
  try {
    intents.value = await adminIntentApi.getIntents();
  } catch {
    ElMessage.error('Gagal mengambil data intents');
  } finally {
    loading.value = false;
  }
};

const toggleActive = async (intent: Intent) => {
  try {
    await adminIntentApi.updateIntent(intent.code, { isActive: !intent.isActive });
    ElMessage.success('Status intent berhasil diupdate');
    fetchIntents();
  } catch {
    ElMessage.error('Gagal update status intent');
  }
};

const handleDelete = async (intent: Intent) => {
  try {
    await ElMessageBox.confirm(
      `Hapus intent "${intent.label}"?`,
      'Konfirmasi Hapus',
      { confirmButtonText: 'Hapus', cancelButtonText: 'Batal', type: 'warning' }
    );
    await adminIntentApi.deleteIntent(intent.code);
    ElMessage.success('Intent berhasil dihapus');
    fetchIntents();
  } catch {
    // Cancelled
  }
};

onMounted(() => {
  fetchIntents();
});
</script>

<template>
  <AdminLayout>
    <div class="page-header">
      <h2 class="page-title">Manajemen Intents Chatbot</h2>
      <el-button type="primary" @click="router.push('/admin/intents/new')">
        <Plus class="btn-icon" />
        Tambah Intent
      </el-button>
    </div>

    <el-table v-loading="loading" :data="intents" stripe class="intent-table">
      <el-table-column prop="code" label="Code" width="160">
        <template #default="{ row }">
          <code class="intent-code">{{ row.code }}</code>
        </template>
      </el-table-column>

      <el-table-column prop="label" label="Label" min-width="150" />

      <el-table-column prop="sortOrder" label="Urutan" width="90" />

      <el-table-column label="Status" width="100">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'info'" size="small">
            {{ row.isActive ? 'Aktif' : 'Nonaktif' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Aksi" width="220" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="toggleActive(row)">
            {{ row.isActive ? 'Nonaktifkan' : 'Aktifkan' }}
          </el-button>
          <el-button type="primary" size="small" @click="router.push(`/admin/intents/${row.code}/edit`)">
            Edit
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">
            Hapus
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="!loading && intents.length === 0" class="empty-state">
      <p>Belum ada intent. Tambahkan intent pertama!</p>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import AdminLayout from './AdminLayout.vue';
export default {
  components: { Plus, AdminLayout },
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.btn-icon {
  margin-right: 6px;
}

.intent-table {
  background: white;
  border-radius: 8px;
}

.intent-code {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #e94560;
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
