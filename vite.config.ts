import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        medicineInventory: path.resolve(__dirname, 'src/medicine-inventory.html'),
        visitLog: path.resolve(__dirname, 'src/visit-log.html'),
        emergencies: path.resolve(__dirname, 'src/emergencies.html'),
        analytics: path.resolve(__dirname, 'src/analytics.html'),
        settings: path.resolve(__dirname, 'src/settings.html'),
        crewRecords: path.resolve(__dirname, 'src/crew-records.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});