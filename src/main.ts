import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

// El componente se maneja en utils.
import 'vue-loading-overlay/dist/css/index.css';

import Select2 from 'vue3-select2-component';

import PrimeVue from 'primevue/config';
import Tree from 'primevue/tree';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .component('EasyDataTable', Vue3EasyDataTable)
    .component('Select2', Select2)
    .component('Tree', Tree)
    .mount('#app');

