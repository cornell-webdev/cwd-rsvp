import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import visualize from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths(), svgr()],
  server: {
    proxy: {
      '/api': 'http://localhost:4001',
    },
  },
  build: {
    rollupOptions: {
      plugins: [visualize({ open: true })],
    },
  },
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
})
