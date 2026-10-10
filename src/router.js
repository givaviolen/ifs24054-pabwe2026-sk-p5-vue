import { createRouter, createWebHistory } from "vue-router";
import { getAccessToken } from "./helpers/apiHelper";

export const routes = [
  {
    path: "/auth",
    component: () => import("./features/auth/layouts/AuthLayout.vue"),
    meta: { guest: true },
    children: [
      { path: "", redirect: "/auth/login" },
      { path: "login", component: () => import("./features/auth/pages/LoginPage.vue") },
      { path: "register", component: () => import("./features/auth/pages/RegisterPage.vue") },
    ],
  },
  {
    path: "/",
    component: () => import("./features/aucations/layouts/AucationLayout.vue"),
    meta: { auth: true },
    children: [
      { path: "", component: () => import("./features/aucations/pages/HomePage.vue") },
      { path: "aucations/:aucationId", component: () => import("./features/aucations/pages/DetailPage.vue") },
      { path: "users", component: () => import("./features/users/pages/UsersPage.vue") },
      { path: "profile", component: () => import("./features/users/pages/ProfilePage.vue") },
    ],
  },
  { path: "/:pathMatch(.*)*", component: () => import("./features/common/pages/NotFoundPage.vue") },
];

export function createAppRouter(history = createWebHistory()) {
  const router = createRouter({ history, routes });
  router.beforeEach((to) => {
    const loggedIn = !!getAccessToken();
    if (to.meta.auth && !loggedIn) return "/auth/login";
    if (to.meta.guest && loggedIn) return "/";
  });
  return router;
}

export default createAppRouter();