import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ref } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "registration",
    component: () => import("../layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/RegistrationView.vue"),
      },
    ],
  },
  {
    path: '/dashboard/projects/:key/issue',
    name: 'projectsTasks',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../layouts/ProjectsLayout.vue'),
    children: [
      {
          path: '',
          component: () => import('../views/ProjectsTasks.vue'),
        },
        {
            path: ':id',
            name: 'projectsItems',
            component: () => import('../views/ProjectsItems.vue'),
          },
          {
            path: "archive",
            name: "archive",
            component: () => import("../views/ArchiveView.vue"),
          },
          {
            path: "canban",
            name: "canban",
            component: () => import("../views/CanbanView.vue"),
          },
    ]
    },
  {
    path: "/login",
    name: "login",
    component: () => import("../layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/LoginView.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../layouts/DefaultLayout.vue"),
    children: [
      {
        path: "projects",
        name: "projects",
        component: () => import("../views/ProjectsView.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/ProfileView.vue"),
        meta: {
          background: "white",
        },
      },
      {
        path: "your-work",
        name: "your-work",
        component: () => import("../views/YourWork.vue"),
      },
      {
        path: "team",
        name: "team",
        component: () => import("../views/TeamView.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/ErrorView.vue"),
    meta: {
      title: "Сторінку не знайдено",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

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
