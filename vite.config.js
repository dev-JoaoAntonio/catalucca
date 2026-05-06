import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({}),
  ],
  define: {
    __QUASAR_VERSION__: JSON.stringify('2.17.4'),
    __QUASAR_SSR__: isSsrBuild,
    __QUASAR_SSR_SERVER__: isSsrBuild,
    __QUASAR_SSR_CLIENT__: !isSsrBuild,
    __QUASAR_SSR_PSEUDO_HYDRATION__: false,
  },
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
}));
