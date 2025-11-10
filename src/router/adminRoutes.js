import AdminEventsViewLayout from "@/layout/AdminEventsViewLayout.vue";
import EventsViewLayout from "@/layout/EventsViewLayout.vue";
import AdminLayout from "@/layout/user/AdminLayout.vue";
import AdminCampaniasView from "@/view/eventos/AdminCampaniasView.vue";
import ClienteCampaniasView from "@/view/eventos/AdminCampaniasView.vue";
import AdminEmergenciaView from "@/view/eventos/adminEmergenciaView.vue";
import ClienteEmergenciaView from "@/view/eventos/adminEmergenciaView.vue";
import AdminGeneralVue from "@/view/eventos/AdminGeneralVue.vue";
import ClienteGeneralVue from "@/view/eventos/AdminGeneralVue.vue";
import AdminPsicologicaView from "@/view/eventos/AdminPsicologicaView.vue";
import ClientePsicologicaView from "@/view/eventos/AdminPsicologicaView.vue";
import AdminUserHomeView from "@/view/user/AdminUserHomeView.vue";
import UserHomeView from "@/view/user/UserHomeView.vue";
//import Article from "@/view/admin/Article.vue";

const adminRoutes = [
  {
    path: "/admin",
    component: AdminLayout,
    // meta: { requiresAuth: true, role: 'CLIENT' },
    children: [
      {
        path: "",
        name: "admin_articles",
        component: AdminUserHomeView,
      },
      {
        path: "admin_alert/:id/",
        name: "admin_alert",
        component: AdminEventsViewLayout,
        children: [
          {
            path: "admin_emergencia",
            name: "admin_emergencia",
            component: AdminEmergenciaView,
          },
          {
            path: "admin_campanias",
            name: "admin_campanias",
            component: AdminCampaniasView,
          },
          {
            path: "admin_psicologica",
            name: "admin_psicologica",
            component: AdminPsicologicaView,
          },
          {
            path: "admin_general",
            name: "admin_general",
            component: AdminGeneralVue,
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
