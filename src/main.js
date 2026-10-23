import { ViteSSG } from 'vite-ssg';

import App from './App.vue';
import { routes } from './router/routes';
import { scrollBehavior } from './router/scroll';
import { reveal } from '@/directives/reveal';
import { progress } from '@/directives/progress';
import { split } from '@/directives/split';

import './css/app.css';

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app, router, isClient }) => {
    app.directive('reveal', reveal);
    app.directive('progress', progress);
    app.directive('split', split);

    if (isClient) {
      // Sinaliza ao script inline do index.html que o app subiu.
      window.__catalucca = true;
      document.documentElement.classList.add('js');

      // Browser não restaura a posição de scroll — quem decide é o
      // scrollBehavior do router (sempre top em refresh / nav fresca).
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      router.afterEach((to) => {
        if (to.meta?.title) {
          document.title = to.meta.title;
        }
      });
    }
  }
);
