import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import UserManageRouter from "./modules/UserManage";
import RoleListRouter from "./modules/RoleList";
import PermissionListRouter from "./modules/PermissionList";
import ArticleRouter from "./modules/Article";
import ArticleCreaterRouter from "./modules/ArticleCreate";
import store from "@/store/index";

export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter,
];

export const publicRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    redirect: "/profile",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile/index"),
        meta: {
          title: "profile",
          icon: "el-icon-user",
        },
      },
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404"),
      },
      {
        path: "401",
        name: "401",
        component: () => import("@/views/error-page/401"),
      },
    ],
  },
];

/**
 * 初始化路由表
 */
export function resetRouter() {
  const menus = store.getters.userInfo?.permission?.menus;

  if (menus) {
    menus.forEach((menu) => {
      router.removeRoute(menu);
    });
  }
}

const router = createRouter({
  history:
    process.env.NODE_ENV === "production"
      ? createWebHistory()
      : createWebHashHistory(),
  routes: publicRoutes,
});

export default router;
