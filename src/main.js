import { createApp } from 'vue';
import { Quasar } from 'quasar';

import App from './App.vue';
import router from './router';
import { reveal } from '@/directives/reveal';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';
import './css/app.css';

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
});
app.use(router);
app.directive('reveal', reveal);

app.mount('#app');
