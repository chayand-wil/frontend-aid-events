<template>
  <div class="mt-24 mb-10 flex items-center justify-center">

      <!-- BARRA   categoriasss -->
      <div
        class="flex space-x-8 px-6 border-b-2 border-indigo-500 w-fit mx-auto text-sm font-semibold text-white"
      >
        <button
          @click="router.push('/user/home')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Articulos
        </button>
        <button
          @click="router.push('/user/home/promotions')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Promociones
        </button>
        <button
          @click="router.push('/user/home/events')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Eventos
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
