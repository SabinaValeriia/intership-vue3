import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RegistrationView from '../views/RegistrationView.vue'
import TasksView from '../views/TasksView.vue'
import TaskItem from '../components/TaskItem.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'registration',
    component: RegistrationView
  },
  {
    path: '/taskItem',
    name: 'taskItem',
    component: TaskItem
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {
      requiresAuth: true,
    },
    component: TasksView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      console.log(111)
      next();
    } else {
      next("/login"); 
    }
  } else {
    next();
    console.log(22)
  }
});


export default router;
