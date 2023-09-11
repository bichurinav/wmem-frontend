import { createApp } from 'vue';
import { vue3Debounce } from 'vue-debounce';
import VueClickAway from 'vue3-click-away';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// styles
import './assets/styles/app.scss';

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia)
  .use(router)
  .use(VueClickAway)
  .directive('debounce', vue3Debounce({ lock: true }))
  .mount('#app');
