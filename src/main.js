import { ViteSSG } from 'vite-ssg';

import App from './App.vue';
import { routes } from './router/routes';
import { scrollBehavior } from './router/scroll';
import { reveal } from '@/directives/reveal';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './css/app.css';

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  async ({ app, router, isClient }) => {
    app.directive('reveal', reveal);

    if (isClient) {
      const { Quasar } = await import('quasar');
      app.use(Quasar, { plugins: {} });

      router.afterEach((to) => {
        if (to.meta?.title) {
          document.title = to.meta.title;
        }
      });
    }
  }
);
