import { fileURLToPath, URL } from 'node:url'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { createHtmlPlugin }  from "vite-plugin-html"

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:      '',
  plugins: 
  [vue(),
    [ cssInjectedByJsPlugin(),
    createHtmlPlugin({ minify: true }),
    ],
  ],
  build: 
  { minify:  'terser',
    terserOptions: 
    { output: { comments: false } },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '/css':   fileURLToPath(new URL('./src/css',              import.meta.url)),
      'config': fileURLToPath(new URL('./src/css/_config.scss', import.meta.url)),
    }
  }
})
