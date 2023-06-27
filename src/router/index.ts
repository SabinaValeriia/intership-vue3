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
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   meta: {
  //     requiresAuth: true,
  //   },
  //   component: () => import('../layouts/DefaultLayout.vue'),
  //   children: [
  //     {
  //       path: '/profile',
  //       name: 'profile',
  //       component: () => import('../views/ProfileView.vue'),
  //     },
  //   ]
  // },
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
        path: '/projects/tasksItem/:id',
        name: 'tasksItem',
        component: () => import('../views/TaskItem.vue'),
      },
      {
        path: '/projects/issues',
        name: 'projects',
        component: () => import('../views/ProjectsView.vue'),
      },
      {
        path: '/projects/issues/:id',
        name: 'projectsItems',
        component: () => import('../views/ProjectsItems.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
      },
      {
        path: '/your-work',
        name: 'your-work',
        component: () => import('../views/YourWork.vue'),
      },
      {
        path: '/projects/archive',
        name: 'archive',
        component: () => import('../views/ArchiveView.vue'),
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
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/ErrorView.vue'),
    meta: {
      title: 'Сторінку не знайдено',
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
    } else {
      next("/login"); 
    }
  } else {
    next();
  }
});


export default router;
