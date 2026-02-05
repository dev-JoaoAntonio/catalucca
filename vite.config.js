import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        educacao: resolve(__dirname, 'educacao.html'),
        privado: resolve(__dirname, 'setor-privado.html'),
        publico: resolve(__dirname, 'setor-publico.html'),
      },
    },
  },
});