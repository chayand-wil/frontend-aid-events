import { createRouter, createWebHistory } from "vue-router";
import ActivacionDeLaCuenta from "@/view/auth/activacion_cuenta.vue";
import Forgot_password from "@/view//auth/forgot_password.vue";
import homeLayoutUser from "@/layout/user/UserLayout.vue";
import UserHomeView from "@/view/user/UserHomeView.vue";
import PublicationView from "@/view/user/AlertView.vue";
import DetallePublicationLayoutView from "@/layout/DetallePublicationLayoutView.vue";
import CatotegorysLayout from "@/layout/user/CatotegorysLayout.vue";
import FiltrarCatalogoView from "@/view/FiltrarCatalogoView.vue";
import SendCodePassword from "@/view//auth/SendCodePassword.vue";
import CartLayout from "@/layout/user/CartLayout.vue";
import MyArticles from "@/view/user/cart/MyArticles.vue";
import WishList from "@/view/user/cart/WishList.vue";
import Cart from "@/view/user/cart/Cart.vue";
import adminRoutes from "./adminRoutes";
import EventView from "@/view/user/EventView.vue";

const routes = [
  // {
  //   path: '/',
  //   component: homeLayout,
  //   children: [{ path: '', name: 'invited', component: HomeView }],
  // },

  {
    path: "/user",
    component: homeLayoutUser,
    // meta: { requiresAuth: true, role: 'CLIENT' },
    children: [
      {
        path: "",
        name: "articles",
        component: UserHomeView,
      },
      {
        path: "alert/:id/",
        name: "alert",
        component: PublicationView,
        props: true,
      },
      {
        path: "search",
        name: "search",
        component: FiltrarCatalogoView,
      },
      {
        path: "cart",
        component: CartLayout,
        children: [
          { path: "", name: "cart", component: Cart },
          { path: "my_articles", name: "my_articles", component: MyArticles },
          { path: "wish_list", name: "wish_list", component: WishList },
        ],
      },
    ],
  },

  ...adminRoutes,

  // nada -  captura de rutas no encontradas
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: { name: "articles" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware de autenticación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Si la ruta requiere autenticación y no hay token → redirige a login
  if (to.meta.requiresAuth && !token) {
    return next({ name: "login" });
  }

  // Si la ruta tiene un rol específico y el usuario no coincide → login
  if (to.meta.role && to.meta.role !== role) {
    return next({ name: "login" });
  }

  //Si esta autenticado y quiere entrar a rutas publicas
  // const publicRoutes = [
  //   "login",
  //   "register",
  //   "invited",
  //   "recover_password",
  //   "activate",
  // ];

  // if (token && publicRoutes.includes(to.name)) {
  //   if (role === "ADMIN") return next({ name: "admin" });
  //   if (role === "CLIENT") return next({ name: "user" });
  // }

  next();
});
export default router;
