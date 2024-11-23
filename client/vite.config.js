// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build:{
//     outDir:'dist'
//   },
//   server: {
//     headers: {
//       // 'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; font-src 'self' data:; img-src 'self' data:",
//       'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval';",
//     },
//   },

// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' https://vercel.live; font-src 'self' data:; img-src 'self' data:;",
    },
  },
});

