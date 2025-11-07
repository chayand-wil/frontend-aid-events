<template>
  <div class="mt-24 mb-10 flex items-center justify-center">

      <!-- BARRA   categoriasss -->
      <div
        class="flex space-x-8 px-6 border-b-2 border-indigo-500 w-fit mx-auto text-sm font-semibold text-white"
      >
        <button
          @click="router.push('/user/cart')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Pendiente de pago 
        </button>
        <button
          @click="router.push('/user/cart/my_articles')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
         Mis Compras 
        </button>
        <button
          @click="router.push('/user/cart/wish_list')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Lista de deseos
        </button>
        
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../axios'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  try {
  //   const res = await api.get('/me')
  //   if (res.data.rol.slug !== 'reutilizador') {
  //     router.push('/')
  //   } else {
  //   }
  } catch (e) {
    router.push('/')
  }
})

// const cargarPublications = async () => {
//   alert('Cargar publicaciones no implementado aún')
// }
</script>
