import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    port: 9000,
    open: true,
    proxy: {
      '/echarts': {
        target: 'https://echarts.apache.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/echarts/, ''),
        secure: false,
        ws: true,
        // bypass(req, res, options) {
        //   console.log(req, res, options)
        // },
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // @ 符号指向 src 目录，用于简化导入路径
      '@static': fileURLToPath(new URL('./static', import.meta.url)), // 静态资源路径别名
      // "@": resolve(__dirname, "./src"),
      // "components": resolve(__dirname, "./src/components"),
      // "api": resolve(__dirname, "./src/api"),
    },
  },
})
