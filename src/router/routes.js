const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/HomePage.vue"),
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
        path: "login",
        name: "Login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("pages/ForgotPasswordPage.vue"),
      },
      {
        path: "/update-password",
        name: "UpdatePassword",
        component: () => import("pages/UpdatePasswordPage.vue"),
      },
      {
        path: "/email-confirmation",
        name: "EmailConfirmation",
        component: () => import("pages/EmailConfirmationPage.vue"),
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
