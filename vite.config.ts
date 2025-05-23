import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import vueDevTools from "vite-plugin-vue-devtools";
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  define: {
    global: "window",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  plugins: [vue(), vueDevTools()],
  server: {
    port: 9000,
    open: true,
    proxy: {
      "/cos": {
        target: "https://cos.gz-tst.cos.tg.unicom.local",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cos/, ""),
        secure: false,
        ws: true,
      },
      "/echarts": {
        target: "https://echarts.apache.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/echarts/, ""),
        secure: false,
        ws: true,
        // bypass(req, res, options) {
        //   console.log(req, res, options)
        // },
      },
    },
  },
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, 'src'),
      "@/static": fileURLToPath(new URL("./static", import.meta.url)), // 静态资源路径别名
      "@/utils": path.resolve(__dirname, 'src/utils'),
      "@/assets": path.resolve(__dirname, 'src/assets'),
      "@/components": path.resolve(__dirname, 'src/components'),
      "@/views": path.resolve(__dirname, 'src/views'),
      "@":path.resolve(__dirname, "./src"),
      // "components": resolve(__dirname, "./src/components"),
      // "api": resolve(__dirname, "./src/api"),
    },
  },
  assetsInclude: ['**/*.glb'],
});
