<template>
  <div class="mt-24 mb-10 flex items-center justify-center">

      <!-- BARRA   categoriasss -->
      <div
        class="flex space-x-8 px-6 border-b-2 border-indigo-500 w-fit mx-auto text-sm font-semibold text-white"
      >
        <button
          @click="redireccionar('emergencia')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Ayuda de emergencia

        </button>
        <button
          @click="redireccionar('psicologica')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Ayuda psicológica
        </button>
        <button
          @click="redireccionar('general')"
          class="pb-2 hover:border-b-2 hover:border-white"
        >
          Ayuda General

        </button>
        <button
          @click="redireccionar('campanias')"
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
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const currentAlert = ref(null)


const redireccionar = (vista) => {
  router.push({ name: vista, params: { id: currentAlert.value } });
}

onMounted(async () => {
  currentAlert.value = route.params.id
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
