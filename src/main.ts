import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { formatDate } from './composables/formateDate';
import { calcTimeDiff } from './composables/calcTimeDiff';
import { isBeforeDate } from './composables/isBeforeDate';
import { getYear } from './composables/getYear';
import { setDate } from './composables/setDate';
import { getDate } from './composables/getDate';

createApp(App).use(store).use(router).mount('#app')

// const app = createApp(App);

// app.config.globalProperties.$formatDate = formatDate;
// app.config.globalProperties.$calculateTimeDifference = calcTimeDiff;
// app.config.globalProperties.$isBeforeDate = isBeforeDate;
// app.config.globalProperties.$getYear = getYear;
// app.config.globalProperties.$setDate = setDate;
// app.config.globalProperties.$getDateAspect = getDate;

// app.mount('#app');
