import { defineConfig } from 'vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '/images': path.resolve(__dirname, './src/assets/images')
    }
  },
  define: {
    'process': {
      env: {
        BROWSER: true
      }
    }
  },
  plugins: [
    vue(),
    eslintPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    importToCDN({
      modules: [
        autoComplete('vue'),
        autoComplete('axios'),
        {
          name: 'element-plus',
          var: 'element-plus',
          path: '//unpkg.com/element-plus@2.0.2'
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/global.scss";`
      }
    }
  },
  server: {
    https: false,
    proxy: {
      '/api': {
        target: `http://127.0.0.1:8140/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
