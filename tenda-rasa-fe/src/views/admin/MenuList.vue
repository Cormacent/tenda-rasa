<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { adminMenuApi, type MenuItem } from '@/api/admin';
import { ElMessage, ElMessageBox } from 'element-plus';

const router = useRouter();

const menus = ref<MenuItem[]>([]);
const loading = ref(false);
const searchQuery = ref('');

const filteredMenus = () => {
  if (!searchQuery.value) return menus.value;
  const query = searchQuery.value.toLowerCase();
  return menus.value.filter(
    menu =>
      menu.menuName.toLowerCase().includes(query) ||
      menu.category.toLowerCase().includes(query) ||
      menu.boothName.toLowerCase().includes(query)
  );
};

const fetchMenus = async () => {
  loading.value = true;
  try {
    menus.value = await adminMenuApi.getMenus();
  } catch {
    ElMessage.error('Gagal mengambil data menu');
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (menu: MenuItem) => {
  try {
    await ElMessageBox.confirm(
      `Hapus menu "${menu.menuName}"?`,
      'Konfirmasi Hapus',
      { confirmButtonText: 'Hapus', cancelButtonText: 'Batal', type: 'warning' }
    );

    await adminMenuApi.deleteMenu(menu.id);
    ElMessage.success('Menu berhasil dihapus');
    fetchMenus();
  } catch {
    // Cancelled
  }
};

onMounted(() => {
  fetchMenus();
});
</script>

<template>
  <AdminLayout>
    <div class="page-header">
      <h2 class="page-title">Manajemen Menu</h2>
    </div>

    <div class="toolbar">
      <el-input
        v-model="searchQuery"
        placeholder="Cari menu..."
        class="search-input"
        clearable
      >
        <template #prefix>
          <Search />
        </template>
      </el-input>

      <el-button type="primary" @click="router.push('/admin/menus/new')">
        <Plus class="button-icon" />
        Tambah Menu
      </el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="filteredMenus()"
      stripe
      class="menu-table"
    >
      <el-table-column label="Gambar" width="80">
        <template #default="{ row }">
          <el-image
            v-if="row.imageUrl"
            :src="row.imageUrl"
            fit="cover"
            class="menu-image"
          />
          <div v-else class="no-image">-</div>
        </template>
      </el-table-column>

      <el-table-column prop="menuName" label="Nama Menu" min-width="150" />
      <el-table-column prop="category" label="Kategori" width="120" />
      <el-table-column prop="price" label="Harga" width="100">
        <template #default="{ row }">
          Rp {{ row.price.toLocaleString('id-ID') }}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="Stok" width="80" />
      <el-table-column label="Status" width="100">
        <template #default="{ row }">
          <el-tag :type="row.isAvailable ? 'success' : 'danger'" size="small">
            {{ row.isAvailable ? 'Tersedia' : 'Habis' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Aksi" width="140" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="router.push(`/admin/menus/${row.id}/edit`)"
          >
            Edit
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">
            Hapus
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="!loading && filteredMenus().length === 0" class="empty-state">
      <p v-if="searchQuery">Menu tidak ditemukan</p>
      <p v-else>Belum ada menu. Tambahkan menu pertama!</p>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import { Search, Plus } from '@element-plus/icons-vue';
import AdminLayout from './AdminLayout.vue';
export default {
  components: { Search, Plus, AdminLayout },
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

.toolbar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;
}

.search-input {
  max-width: 300px;
}

.button-icon {
  margin-right: 6px;
}

.menu-table {
  background: white;
  border-radius: 8px;
}

.menu-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

.no-image {
  width: 50px;
  height: 50px;
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 12px;
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
