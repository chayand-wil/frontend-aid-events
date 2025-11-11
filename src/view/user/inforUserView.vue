<template>

  <div class="mt-8 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white">
    <h1 class="text-2xl font-semibold">Información de usuario</h1>
  </div>

  <div v-if="user" class="mt-6 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white">
    <h2 class="text-2xl font-semibold mb-2">{{ user.name }}</h2>
    <p class="text-sm text-gray-200 mb-4">Email: <strong class="text-white">{{ user.email }}</strong></p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-200">
      <div><strong>Profesión:</strong> {{ user.profession ?? '—' }}</div>
      <div><strong>Dirección:</strong> {{ user.address ?? '—' }}</div>
      <div><strong>Género:</strong> {{ formatGender(user.gender) }}</div>
      <div><strong>Tipo:</strong> {{ user.type ?? '—' }}</div>
      <div><strong>Posición política:</strong> {{ user.politicalPosition ?? '—' }}</div>
      <div><strong>Estado:</strong> {{ formatState(user.state) }}</div>
    </div>
  </div>

  <div v-else class="mt-8 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white">
    <div v-if="loading">Cargando usuario...</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>
    <div v-else class="text-gray-300">No hay información de usuario para mostrar.</div>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { fetchUserById } from '../../services/user'

const route = useRoute()
const user = ref(null)
const loading = ref(false)
const error = ref('')

function formatGender(g) {
  if (g === true) return 'Masculino'
  if (g === false) return 'Femenino'
  return '—'
}

function formatState(s) {
  if (s === true) return 'Activo'
  if (s === false) return 'Inactivo'
  return '—'
}

const loadUser = async (id) => {
  if (!id) {
    error.value = 'ID de usuario no proporcionado.'
    return
  }
  loading.value = true
  error.value = ''
  try {
    const data = await fetchUserById(id)
    // La API puede devolver un array o un objeto
    if (Array.isArray(data)) user.value = data[0] ?? null
    else user.value = data ?? null
  } catch (err) {
    console.error('Error al cargar usuario:', err)
    error.value = err?.message || 'Error al cargar usuario.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Prioriza id en params, luego en localStorage bajo la llave 'id'
  const idFromRoute = route.params.id || route.params.userId || null
  const idFromStorage = !idFromRoute ? localStorage.getItem('id') : null
  const id = idFromRoute || idFromStorage || null
  loadUser(id)
})

</script>