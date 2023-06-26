import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ref } from 'vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'registration',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/RegistrationView.vue'),
      },
    ]
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '/task',
        name: 'task',
        component: () => import('../views/TasksList.vue'),
      },
      {
        path: '/tasksItem/:id',
        name: 'tasksItem',
        component: () => import('../views/TaskItem.vue'),
      },
    ]

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/LoginView.vue'),
      },
    ]
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
