<template>
  <div class="mt-24 mb-10 flex items-center justify-center">

      <!-- BARRA   categoriasss -->
      <div
        class="flex space-x-8 px-6 border-b-2 border-indigo-500 w-fit mx-auto text-sm font-semibold text-white"
      >
        <button
          @click="router.push('/user/alert/' + currentAlert + '/emergencia')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Ayuda de emergencia

        </button>
        <button
          @click="router.push('/user/alert/' + currentAlert + '/psicologica')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Ayuda psicológica
        </button>
        <button
          @click="router.push('/user/alert/' + currentAlert + '/general')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Ayuda General

        </button>
        <button
          @click="router.push('/user/alert/' + currentAlert + '/campanias')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Generación de campañas

        </button>

        
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentAlert = ref(null)

onMounted(async () => {
  currentAlert.value = sessionStorage.getItem('idAlert')
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
