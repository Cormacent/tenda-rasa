<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { adminIntentApi, type Intent } from '@/api/admin';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.code);
const loading = ref(false);
const submitting = ref(false);

const form = ref({
  code: '',
  label: '',
  promptInstruction: '',
  isActive: true,
  sortOrder: 0,
});

const fetchIntent = async (code: string) => {
  loading.value = true;
  try {
    const intents: Intent[] = await adminIntentApi.getIntents();
    const intent = intents.find(i => i.code === code);
    if (intent) {
      form.value = { ...intent };
    } else {
      ElMessage.error('Intent tidak ditemukan');
      router.push('/admin/intents');
    }
  } catch {
    ElMessage.error('Gagal mengambil data intent');
    router.push('/admin/intents');
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  if (!form.value.code || !form.value.label || !form.value.promptInstruction) {
    ElMessage.warning('Code, label, dan prompt instruction harus diisi');
    return;
  }

  submitting.value = true;
  try {
    if (isEdit.value) {
      await adminIntentApi.updateIntent(String(route.params.code), form.value);
      ElMessage.success('Intent berhasil diupdate');
    } else {
      await adminIntentApi.createIntent(form.value);
      ElMessage.success('Intent berhasil dibuat');
    }
    router.push('/admin/intents');
  } catch (err: unknown) {
    const error = err as { response?: { status?: number } };
    if (error.response?.status === 409) {
      ElMessage.error('Code sudah digunakan');
    } else {
      ElMessage.error(isEdit.value ? 'Gagal update intent' : 'Gagal membuat intent');
    }
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  if (isEdit.value) fetchIntent(String(route.params.code));
});
</script>

<template>
  <AdminLayout>
    <div class="page-header">
      <el-button text @click="router.push('/admin/intents')">
        <ArrowLeft class="btn-icon" />
        Kembali
      </el-button>
      <h2 class="page-title">{{ isEdit ? 'Edit Intent' : 'Tambah Intent Baru' }}</h2>
    </div>

    <el-form v-loading="loading" :model="form" label-width="160px" class="intent-form">
      <el-form-item label="Code" required>
        <el-input
          v-model="form.code"
          placeholder="Contoh: GREETING"
          :disabled="isEdit"
        />
      </el-form-item>

      <el-form-item label="Label" required>
        <el-input v-model="form.label" placeholder="Contoh: Sapaan" />
      </el-form-item>

      <el-form-item label="Prompt Instruction" required>
        <el-input
          v-model="form.promptInstruction"
          type="textarea"
          :rows="5"
          placeholder="Instruksi untuk AI chatbot ketika intent ini terdeteksi..."
        />
      </el-form-item>

      <el-form-item label="Urutan">
        <el-input-number v-model="form.sortOrder" :min="0" />
      </el-form-item>

      <el-form-item label="Aktif">
        <el-switch v-model="form.isActive" />
      </el-form-item>

      <el-form-item class="form-actions">
        <el-button @click="router.push('/admin/intents')">Batal</el-button>
        <el-button type="primary" :loading="submitting" @click="handleSubmit">
          {{ isEdit ? 'Simpan Perubahan' : 'Buat Intent' }}
        </el-button>
      </el-form-item>
    </el-form>
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

.intent-form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 700px;
}

.form-actions {
  margin-top: 24px;
  margin-bottom: 0;
}
</style>
