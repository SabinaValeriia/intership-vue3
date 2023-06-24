// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'

// createApp(App).use(store).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { tasks } from './router/routeProps'

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');

// Export the tasks ref
export { router, tasks };