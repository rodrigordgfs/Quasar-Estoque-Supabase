const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/Home.vue"),
        meta: {
          menu: true,
          icon: "home",
          title: "Home",
        },
      },
      {
        path: "/category",
        name: "Category",
        component: () => import("pages/Category.vue"),
        meta: {
          menu: true,
          icon: "category",
          title: "Categorias",
        },
      },
    ],
    meta: {
      auth: true,
    },
  },
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/Register.vue"),
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("pages/ForgotPassword.vue"),
      },
      {
        path: "/update-password",
        name: "UpdatePassword",
        component: () => import("pages/UpdatePassword.vue"),
      },
      {
        path: "/email-confirmation",
        name: "EmailConfirmation",
        component: () => import("pages/EmailConfirmation.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/404.vue"),
  },
];

export default routes;
