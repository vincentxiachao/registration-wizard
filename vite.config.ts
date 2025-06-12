/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
// import { federation } from '@module-federation/vite';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: 'brotliCompress',
      threshold: 10240,
    }),
  ],
  server: {
    watch: {
      ignored: ['**/db.json'],
    },
  },
  // plugins: [
  //   react(),
  //   tailwindcss(),
  //   federation({
  //     name: 'remote',
  //     filename: 'remoteEntry.js',
  //     exposes: {
  //       './remote-app': './src/App.tsx',
  //       './remote-router-dom': 'remote-router-dom',
  //     },
  //     shared: {
  //       react: {
  //         requiredVersion: '^19.1.0',
  //         singleton: true,
  //       },

  //       'react-dom': { singleton: true, requiredVersion: '^19.1.0' },
  //     },
  //   }),
  // ],

  // build: {
  //   target: 'esnext',
  // },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
      '@features': path.resolve(__dirname, './src/features'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['@reduxjs/toolkit'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
        },
      },
      external: [/__tests__/],
    },
  },
});
