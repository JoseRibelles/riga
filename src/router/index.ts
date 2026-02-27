import { createRouter, createWebHistory } from "@ionic/vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/login" },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("../views/SignUpView.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/ForgotPasswordView.vue"),
  },
  {
    path: "/verify-code",
    name: "VerifyCode",
    component: () => import("../views/VerifyCodeView.vue"),
  },
  {
    path: "/password-reset-success",
    name: "PasswordResetSuccess",
    component: () => import("../views/PasswordResetSuccesView.vue"),
  },

  {
    path: "/menu",
    name: "Menu",
    component: () => import("../views/MenuPageView.vue"),
  },
  {
    path: "/4-cheese",
    name: "FourCheese",
    component: () => import("../views/FourCheesePageView.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/SettingsPageView.vue"),
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    component: () => import("../views/EditProfilePageView.vue"),
  },

  { path: "/:pathMatch(.*)*", redirect: "/login" },

  { path: '/cart',            component: () => import('../views/CartView.vue') },
{ path: '/order-confirmed', component: () => import('../views/OrderConfirmedView.vue') },
{ path: '/track-order',     component: () => import('../views/TrackOrderView.vue') },
{ path: '/chat',            component: () => import('../views/ChatView.vue') },


{ path: '/create',      name: 'Create',      component: () => import('../views/CreateView.vue') },
{ path: '/small-menu',  name: 'SmallMenu',   component: () => import('../views/SmallView.vue') },
{ path: '/medium-menu', name: 'MediumMenu',  component: () => import('../views/MediumView.vue') },
{ path: '/large-menu',  name: 'LargeMenu',   component: () => import('../views/LargeView.vue') },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;