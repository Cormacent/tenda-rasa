import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // Auto-import APIs seperti ref, reactive, computed, dll
      imports: ['vue', 'vue-router', 'pinia'],
      dts: './auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({ prefix: 'icon' }), // ⬅️ misal <icon-ep-edit />
      ],
    }),
    Components({
      dts: './components.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({ prefix: 'icon' }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],


  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
});
