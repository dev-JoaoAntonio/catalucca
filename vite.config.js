import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
  },
  ssr: {
    noExternal: [/^@unhead\//],
  },
  ssgOptions: {
    formatting: 'minify',
    crittersOptions: false,
    includedRoutes(paths) {
      // Excluir redirects (Vercel cuida via 301 server-side)
      // e qualquer rota com parâmetro/catch-all (renderiza só URLs estáticas)
      return paths.filter(
        (p) =>
          !['/setor-privado', '/setor-publico'].includes(p) &&
          !p.includes(':')
      );
    },
  },
});
