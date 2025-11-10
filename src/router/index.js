import { createRouter, createWebHistory } from "vue-router";
import homeLayoutUser from "@/layout/user/UserLayout.vue";
import UserHomeView from "@/view/user/UserHomeView.vue";
import adminRoutes from "./adminRoutes";
import EventsViewLayout from "@/layout/EventsViewLayout.vue";
import EmergenciaView from "@/view/eventos/EmergenciaView.vue";
import PsicologicaView from "@/view/eventos/PsicologicaView.vue";
import GeneralVue from "@/view/eventos/GeneralVue.vue";
import CampaniasView from "@/view/eventos/CampaniasView.vue";
import Login from "@/view/auth/login.vue";
import Register from "@/view/auth/register.vue";

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
        component: EventsViewLayout,
        children: [
          {
            path: "emergencia",
            name: "emergencia",
            component: EmergenciaView,
          },
          {
            path: "campanias",
            name: "campanias",
            component: CampaniasView,
          },
          {
            path: "psicologica",
            name: "psicologica",
            component: PsicologicaView,
          },
          {
            path: "general",
            name: "general",
            component: GeneralVue,
          },
        ],
      },
 
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
    {
    path: "/register",
    name: "register",
    component: Register,
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

  // // Si esta autenticado y quiere entrar a rutas publicas
  // const publicRoutes = [
  //   "login",
  //   "register",
  //   "invited",
  // ];

  // if (token && publicRoutes.includes(to.name)) {
  //   if (role === "ADMIN") return next({ name: "admin" });
  //   if (role === "COMUN") return next({ name: "user" });
  // }

  next();
});
export default router;
