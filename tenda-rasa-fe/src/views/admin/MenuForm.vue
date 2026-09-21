<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { adminMenuApi, type MenuItem } from '@/api/admin';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const loading = ref(false);
const submitting = ref(false);
const imagePreview = ref('');

// Image input mode: 'upload' | 'url' | 'none'
const imageMode = ref<'upload' | 'url' | 'none'>('none');

const form = ref({
  menuName: '',
  description: '',
  price: 0,
  category: '',
  menuType: '',
  spicinessLevel: 0,
  stock: 0,
  estimatedMinutes: 15,
  tags: '',
  boothName: 'Tenda Rasa',
  isAvailable: true,
  isFavorite: false,
  image: null as File | null,
  imageUrl: '',
});

const categories = ['Makanan', 'Minuman', 'Dessert', 'Snack', 'Makanan Ringan'];
const menuTypes = [
  'Makanan Berat', 'Makanan Ringan', 'Kopi', 'Non-Kopi',
  'Jus', 'Smoothie', 'Teh', 'Dessert',
];

const handleImageFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    form.value.image = file;
    form.value.imageUrl = '';
    imageMode.value = 'upload';
    const reader = new FileReader();
    reader.onload = (e) => { imagePreview.value = e.target?.result as string; };
    reader.readAsDataURL(file);
  }
};

const handleImageUrlChange = () => {
  form.value.image = null;
  imageMode.value = form.value.imageUrl ? 'url' : 'none';
  imagePreview.value = form.value.imageUrl;
};

const removeImage = () => {
  form.value.image = null;
  form.value.imageUrl = '';
  imagePreview.value = '';
  imageMode.value = 'none';
};

const fetchMenu = async (id: number) => {
  loading.value = true;
  try {
    const menu: MenuItem = await adminMenuApi.getMenu(id);
    form.value = {
      menuName: menu.menuName,
      description: menu.description || '',
      price: menu.price,
      category: menu.category || '',
      menuType: menu.menuType || '',
      spicinessLevel: menu.spicinessLevel || 0,
      stock: menu.stock || 0,
      estimatedMinutes: menu.estimatedMinutes || 15,
      tags: menu.tags?.join(', ') || '',
      boothName: menu.boothName || 'Tenda Rasa',
      isAvailable: menu.isAvailable ?? true,
      isFavorite: menu.isFavorite ?? false,
      image: null,
      imageUrl: '',
    };

    // Set image mode based on existing image
    if (menu.imageUrl) {
      form.value.imageUrl = menu.imageUrl;
      imagePreview.value = menu.imageUrl;
      imageMode.value = 'url';
    } else {
      imagePreview.value = '';
      imageMode.value = 'none';
    }
  } catch {
    ElMessage.error('Gagal mengambil data menu');
    router.push('/admin/menus');
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  if (!form.value.menuName) { ElMessage.warning('Nama menu harus diisi'); return; }
  if (!form.value.price || form.value.price <= 0) { ElMessage.warning('Harga harus lebih dari 0'); return; }

  submitting.value = true;
  try {
    const formData = new FormData();
    formData.append('menuName', form.value.menuName);
    formData.append('description', form.value.description);
    formData.append('price', String(form.value.price));
    formData.append('category', form.value.category);
    formData.append('menuType', form.value.menuType);
    formData.append('spicinessLevel', String(form.value.spicinessLevel));
    formData.append('stock', String(form.value.stock));
    formData.append('estimatedMinutes', String(form.value.estimatedMinutes));
    formData.append('tags', form.value.tags);
    formData.append('boothName', form.value.boothName);
    formData.append('isAvailable', String(form.value.isAvailable));
    formData.append('isFavorite', String(form.value.isFavorite));

    // Handle image based on mode
    if (imageMode.value === 'upload' && form.value.image) {
      formData.append('image', form.value.image);
    } else if (imageMode.value === 'url') {
      formData.append('imageUrl', form.value.imageUrl);
    } else if (imageMode.value === 'none') {
      if (isEdit.value) {
        formData.append('removeImage', 'true');
      }
    }

    if (isEdit.value) {
      await adminMenuApi.updateMenu(Number(route.params.id), formData);
      ElMessage.success('Menu berhasil diupdate');
    } else {
      await adminMenuApi.createMenu(formData);
      ElMessage.success('Menu berhasil dibuat');
    }
    router.push('/admin/menus');
  } catch {
    ElMessage.error(isEdit.value ? 'Gagal update menu' : 'Gagal membuat menu');
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  if (isEdit.value) fetchMenu(Number(route.params.id));
});
</script>

<template>
  <AdminLayout>
    <div class="page-header">
      <el-button text @click="router.push('/admin/menus')">
        <ArrowLeft class="btn-icon" />
        Kembali
      </el-button>
      <h2 class="page-title">{{ isEdit ? 'Edit Menu' : 'Tambah Menu Baru' }}</h2>
    </div>

    <el-form v-loading="loading" :model="form" label-width="140px" class="menu-form">
      <div class="form-section">
        <h3 class="section-title">Informasi Menu</h3>

        <el-form-item label="Nama Menu" required>
          <el-input v-model="form.menuName" placeholder="Masukkan nama menu" />
        </el-form-item>

        <el-form-item label="Deskripsi">
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="Masukkan deskripsi menu" />
        </el-form-item>

        <el-form-item label="Harga" required>
          <el-input-number v-model="form.price" :min="0" :step="1000" controls-position="right" class="price-input" />
        </el-form-item>

        <el-form-item label="Kategori">
          <el-select v-model="form.category" placeholder="Pilih kategori" clearable>
            <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
          </el-select>
        </el-form-item>

        <el-form-item label="Tipe Menu">
          <el-select v-model="form.menuType" placeholder="Pilih tipe" clearable>
            <el-option v-for="type in menuTypes" :key="type" :label="type" :value="type" />
          </el-select>
        </el-form-item>

        <el-form-item label="Level Pedas">
          <el-rate v-model="form.spicinessLevel" :max="5" />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Stok & Waktu</h3>

        <el-form-item label="Stok">
          <el-input-number v-model="form.stock" :min="0" controls-position="right" />
        </el-form-item>

        <el-form-item label="Estimasi (menit)">
          <el-input-number v-model="form.estimatedMinutes" :min="1" :max="120" controls-position="right" />
        </el-form-item>

        <el-form-item label="Tags">
          <el-input v-model="form.tags" placeholder="Pedas, Favorit, Baru (pisahkan koma)" />
        </el-form-item>

        <el-form-item label="Nama Booth">
          <el-input v-model="form.boothName" />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Gambar</h3>

        <el-form-item label="Sumber Gambar">
          <el-radio-group v-model="imageMode" class="image-mode-group">
            <el-radio value="upload">Upload File</el-radio>
            <el-radio value="url">Dari URL</el-radio>
            <el-radio value="none">Tanpa Gambar</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- Upload File -->
        <el-form-item v-if="imageMode === 'upload'" label="Upload Gambar">
          <div class="image-upload">
            <input type="file" accept="image/*" @change="handleImageFileChange" class="image-input" id="image-input" />
            <label for="image-input" class="upload-label">
              <Plus />
              <span>Pilih File Gambar</span>
            </label>
          </div>
        </el-form-item>

        <!-- URL Input -->
        <el-form-item v-if="imageMode === 'url'" label="URL Gambar">
          <el-input
            v-model="form.imageUrl"
            placeholder="https://example.com/gambar.jpg"
            @input="handleImageUrlChange"
            clearable
          >
            <template #prefix>
              <Link />
            </template>
          </el-input>
        </el-form-item>

        <!-- Image Preview -->
        <el-form-item v-if="imagePreview" label="Preview">
          <div class="image-preview">
            <el-image :src="imagePreview" fit="cover" class="preview-image" />
            <el-button type="danger" size="small" circle class="remove-btn" @click="removeImage">
              <Delete />
            </el-button>
          </div>
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Status</h3>

        <el-form-item label="Tersedia">
          <el-switch v-model="form.isAvailable" />
        </el-form-item>

        <el-form-item label="Favorit">
          <el-switch v-model="form.isFavorite" />
        </el-form-item>
      </div>

      <el-form-item class="form-actions">
        <el-button @click="router.push('/admin/menus')">Batal</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">
          {{ isEdit ? 'Simpan Perubahan' : 'Buat Menu' }}
        </el-button>
      </el-form-item>
    </el-form>
  </AdminLayout>
</template>

<script lang="ts">
import { ArrowLeft, Plus, Delete, Link } from '@element-plus/icons-vue';
import AdminLayout from './AdminLayout.vue';
export default {
  components: { ArrowLeft, Plus, Delete, Link, AdminLayout },
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

.menu-form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 800px;
}

.form-section {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 16px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 16px 0;
}

.price-input {
  width: 200px;
}

.image-mode-group {
  display: flex;
  gap: 16px;
}

.image-upload {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-input {
  display: none;
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  cursor: pointer;
  color: #909399;
  width: fit-content;
}

.upload-label:hover {
  border-color: #409eff;
  color: #409eff;
}

.preview-image {
  width: 200px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
}

.image-preview {
  position: relative;
  display: inline-block;
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
}

.form-actions {
  margin-top: 24px;
  margin-bottom: 0;
}
</style>
