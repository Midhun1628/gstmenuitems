import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import  router  from '../routes/index.js';
import vuetify from './../src/plugins/vuetify.ts'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import Vue3Marquee from 'vue3-marquee';
import Vue3Toastify from 'vue3-toastify'
import SvgSprite from './../src/components/shared/SvgSprite.vue';

// google-fonts
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';



import { vMaska } from 'maska/vue';
// print
import print from 'vue3-print-nb';
//i18
import { createI18n } from 'vue-i18n';
import messages from './../src/utils/locales/messages.ts';

// @ts-expect-error: vue3-easy-data-table doesn't have default export
import DataTable from 'vue3-easy-data-table';

const i18n = createI18n({
  locale: 'en',
  messages: messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

const app = createApp(App);

app.use(Toast, {
  // Optional settings
  position: 'top-right',
  timeout: 3000,
})


app.use(router);
app.component('EasyDataTable', DataTable);
app.use(PerfectScrollbarPlugin);
app.component('SvgSprite', SvgSprite);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(print);
app.use(Vue3Marquee);
app.use(i18n);
app.directive('maska', vMaska);
app.use(VueApexCharts);
app.use(vuetify).mount('#app');
