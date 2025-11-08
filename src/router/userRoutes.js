import homeLayoutUser from "@/layout/user/UserLayout.vue";
import UserHomeView from "@/view/user/UserHomeView.vue";
import DetallePublicationLayoutView from "@/layout/DetallePublicationLayoutView.vue";
import DetailPublication from "@/view/user/DetailPublication.vue";
import PublicationView from "@/view/user/AlertView.vue";


const userRoutes = [
  
  {
    path: '/user/home',
    component: homeLayoutUser,
    meta: { requiresAuth: true, role: 'CLIENT' },
    children: [
      { path: '', name: 'user', component: UserHomeView },
      {
        path: 'pub/:id/',
        component: DetallePublicationLayoutView,
        children: [
          { path: '', name: 'pub', component: PublicationView, props: true },
          { path: 'detail_song', name: 'detail_song', component: DetailPublication, props: true },
        ],
      },
    ]
  }
]

export default userRoutes;