import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: parseInt(process.env.APP_PORT || '3000')
  },
  define: {
    DELCOM_BASEURL: JSON.stringify(process.env.VITE_DELCOM_BASEURL || 'https://open-api.delcom.org/api/v1')
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'src/main.js',
        'src/setupTests.js',
        'src/test-utils.js',
        '**/*.test.*',
        'node_modules/**',
        '.docs/**'
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100
      }
    }
  }
})
