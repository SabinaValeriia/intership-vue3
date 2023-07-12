import { createApp } from 'vue'
import App from './App.vue'
import router from './routerf'
import store from './store'

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');

// Export the tasks ref
export { router };
