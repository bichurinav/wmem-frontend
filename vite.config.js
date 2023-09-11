import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import eslint from 'vite-plugin-eslint';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      exclude: ['/virtual:/**', 'node_modules/**'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
  server: {
    port: 8080,
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer],
    },
    modules: {
      localsConvention: 'dashes',
    },
  },
});
