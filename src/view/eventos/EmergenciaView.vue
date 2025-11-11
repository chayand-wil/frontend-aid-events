<template>
  <!-- Contenedor flotante MENSAJES -->
  <div class="fixed top-20 right-40 z-50 space-y-4 w-[300px]">
    <!-- Mensaje de éxito -->
    <div
      v-if="mensaje"
      class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-lg text-verdee"
    >
      {{ mensaje }}
    </div>

    <!-- Mensaje de error de validación -->
    <div
      v-if="error"
      class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-lg text-red-600"
    >
      {{ error }}
    </div>
  </div>

  <div class="mt-1 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white">
    <h1 class="text-2xl font-semibold mb-2">Eventos de emergencia asociados a la alerta</h1>
    <p class="text-sm text-gray-200 mb-4">Mostrando solo eventos de Voluntariado</p>

    <div v-if="loading" class="py-6">Cargando eventos...</div>

    <div v-else>
      <div v-if="events.length === 0" class="py-6 text-gray-300">No hay eventos de tipo EMERGENCY_AID para esta alerta.</div>

      <ul v-else class="space-y-4">
        <li v-for="ev in events" :key="ev.id" class="bg-white/5 p-4 rounded-lg border border-white/10">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-xl font-medium">{{ ev.title }}</h2>
              <p class="text-sm text-gray-200">{{ ev.description }}</p>
              <p class="text-xs text-gray-400 mt-2">Estado: <strong class="text-white">{{ ev.status }}</strong></p>
              <p class="text-xs text-gray-400">ID evento: {{ ev.id }}</p>
            </div>
            <div class="text-right text-sm text-gray-300">
              <p>Participantes: {{ (ev.participants || []).length }}</p>
              <p>Requerimientos: {{ (ev.requirements || []).length }}</p>
            </div>
          </div>
          <div class="mt-3 flex justify-end">
            <button
              @click.prevent="openEvent(ev)"
              class="bg-verdee text-white px-3 py-1 rounded hover:opacity-90 text-sm"
            >
              Ver evento
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Modal detalle del evento -->
  <div v-if="showModal" class="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white text-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-2xl font-semibold">{{ selectedEvent.title }}</h3>
          <p class="text-sm text-gray-600">ID: {{ selectedEvent.id }} · Estado: {{ selectedEvent.status }}</p>
        </div>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
      </div>

      <div class="mt-4 space-y-3 text-sm">
        <p><strong>Descripción:</strong> {{ selectedEvent.description || '—' }}</p>
        <p><strong>Tipo:</strong> {{ selectedEvent.type }}</p>
        <p><strong>Catástrofe:</strong> {{ selectedEvent.catastropheId || '—' }}</p>
        <p><strong>Fecha inicio:</strong> {{ formatDate(selectedEvent.startDate) }}</p>
        <p><strong>Fecha fin:</strong> {{ formatDate(selectedEvent.endDate) }}</p>

        <div>
          <strong>Participantes ({{ (selectedEvent.participants || []).length }}):</strong>
          <ul class="list-disc list-inside mt-1 text-xs text-gray-700">
            <li v-for="p in selectedEvent.participants || []" :key="p.id">ID: {{ p.id }} — Rol: {{ p.role }} — Estado: {{ p.status }}</li>
          </ul>
        </div>

        <div>
          <strong>Requerimientos ({{ (selectedEvent.requirements || []).length }}):</strong>
          <ul class="list-disc list-inside mt-1 text-xs text-gray-700">
            <li v-for="r in selectedEvent.requirements || []" :key="r.id">{{ r.requirementKey }}: {{ r.requiredValue }}</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 flex justify-end space-x-2">
        <button
          @click.prevent="participateEvent"
          :disabled="participateLoading"
          class="px-4 py-2 bg-verdee text-white rounded hover:opacity-90 disabled:opacity-50"
        >
          <span v-if="participateLoading">Registrando...</span>
          <span v-else>Participar</span>
        </button>

        <button @click="closeModal" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchEventsByAlert } from '../../services/event'
import { createParticipant } from '../../services/participant'

const route = useRoute()
const idAlert = ref(null)
const events = ref([])
const mensaje = ref('')
const error = ref('')
const loading = ref(false)

// Modal / detalle
const showModal = ref(false)
const selectedEvent = ref({})
const participateLoading = ref(false)

function openEvent(ev) {
  selectedEvent.value = ev || {}
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedEvent.value = {}
}

/**
 * Registrar participación del usuario actual en el evento seleccionado
 */
const participateEvent = async () => {
  try {
    error.value = ''
    mensaje.value = ''

    const userIdRaw = localStorage.getItem('id')
    if (!userIdRaw) {
      error.value = 'Usuario no autenticado. Inicia sesión para participar.'
      return
    }

    const userId = Number(userIdRaw)
    if (!userId || !selectedEvent.value?.id) {
      error.value = 'Datos incompletos para registrar la participación.'
      return
    }

    // Evitar registros duplicados (si ya existe un participante con este userId)
    const existing = (selectedEvent.value.participants || []).some((p) => Number(p.userId) === userId)
    if (existing) {
      error.value = 'Ya estás registrado como participante en este evento.'
      return
    }

    participateLoading.value = true

    const payload = {
      userId: userId,
      eventId: selectedEvent.value.id,
      role: 'VOLUNTARIO',
      status: 'PENDIENTE_APROBACION',
      registeredAt: new Date().toISOString(),
    }
    
    console.log('Payload para crear participante:', payload)
    alert('aqui vamos')
    const res = await createParticipant(payload)

    // Dependiendo de la respuesta de la API, puede venir el objeto creado en res.data o res
    const created = res?.data ?? res

    // Añadir al evento seleccionado para actualizar la vista
    if (!selectedEvent.value.participants) selectedEvent.value.participants = []
    selectedEvent.value.participants.push(created)

    // También actualizar el array principal de eventos si corresponde
    const idx = events.value.findIndex((e) => e.id === selectedEvent.value.id)
    if (idx !== -1) {
      if (!events.value[idx].participants) events.value[idx].participants = []
      events.value[idx].participants.push(created)
    }

    mensaje.value = 'Te has registrado correctamente como participante. Estado: PENDIENTE_APROBACION.'
  } catch (err) {
    console.error('Error registrando participante:', err)
    // intentar obtener mensaje de error de la API
    error.value = err?.response?.data?.message || err?.message || 'Error al registrar la participación.'
  } finally {
    participateLoading.value = false
  }
}

function formatDate(d) {
  if (!d) return '—'
  // If date is an object but empty, return placeholder
  if (typeof d === 'object' && Object.keys(d).length === 0) return '—'
  try {
    const dt = new Date(d)
    if (isNaN(dt.getTime())) return String(d)
    return dt.toLocaleString()
  } catch {
    return String(d)
  }
}

const loadEvents = async () => {
  try {
    loading.value = true
    error.value = ''
    mensaje.value = ''

    const catId = idAlert.value
    if (!catId) {
      error.value = 'ID de alerta no proporcionado.'
      events.value = []
      return
    }

    const data = await fetchEventsByAlert(catId)

    // Normalizar la respuesta: puede venir como array o { items: [...] }
    let list = []
    if (Array.isArray(data)) list = data
    else if (data && Array.isArray(data.items)) list = data.items
    else if (data && Array.isArray(data.data)) list = data.data
    else list = []

    // Filtrar solo type === 'EMERGENCY_AID'
    events.value = list.filter((e) => e && e.type === 'EMERGENCY_AID')

    if (events.value.length === 0) {
      mensaje.value = 'No se encontraron eventos de tipo EMERGENCY_AID para esta alerta.'
    }
  } catch (err) {
    console.error('Error cargando eventos por alerta:', err)
    error.value = err?.message || 'Error al cargar eventos.'
  } finally {
    loading.value = false
  }
}

const init = () => {
  idAlert.value = route.params.idAlert || route.params.id || null
  if (idAlert.value) loadEvents()
}

onMounted(() => {
  init()
})
</script>
