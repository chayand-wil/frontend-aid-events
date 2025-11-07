import AdminLayout from "@/layout/admin/AdminLayout.vue";
import Admin from "@/view/admin/admin.vue";
//import Article from "@/view/admin/Article.vue";


const adminRoutes = [
  {
    path: '/admin', // La ruta base para la sección de admin
    component: AdminLayout,
    // meta: { requiresAuth: true, role: 'ADMIN' },
    children: [
      { 
        path: 'home', // Ruta completa: '/admin/home'
        name: 'admin_home', 
        component: Admin 
      },
 
      // Puedes agregar más rutas de admin aquí
    ]
  }
];

export default adminRoutes;