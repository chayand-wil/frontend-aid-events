<template>
  <!-- Contenedor flotante MENSAJES -->
  <div class="fixed top-20 right-40 z-50 space-y-4 w-[300px]">
    <!-- Mensaje de éxito -->
    <div
      v-if="mensaje"
      class="bg-white/20 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-verdee"
    >
      {{ mensaje }}
    </div>

    <!-- Mensaje de error de validación -->
    <div
      v-if="error"
      class="bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-red-600"
    >
      {{ error }}
    </div>
  </div>

 

  <!-- UNA PUBLICACION - DETALLE -->
  <div
    class="mt-24 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white"
  >
    <template v-if="publication">
      <h1 class="text-2xl font-semibold mb-2">{{ publication.eventType || publication.eventId }}</h1>
      <div class="text-sm text-gray-400 mb-4">ID: {{ publication.eventId || publication.id }}</div>
      <p class="mb-4">{{ publication.description }}</p>

      <div class="text-sm text-gray-300 space-y-2">
        <div>Inicio: {{ formatDate(publication.startDate) }}</div>
        <div v-if="publication.endDate">Fin: {{ formatDate(publication.endDate) }}</div>
        <div v-if="publication.country">País: {{ publication.country }}</div>
        <div v-if="publication.location && publication.location.coordinates">Coordenadas: {{ formatCoordinates(publication.location.coordinates) }}</div>

        <div v-if="publication.estimatedCasualties" class="mt-2">
          <div class="font-medium">Estimación de víctimas</div>
          <div>Muertes: {{ publication.estimatedCasualties.deaths ?? 0 }}</div>
          <div>Heridos: {{ publication.estimatedCasualties.injuries ?? 0 }}</div>
          <div>Desplazados: {{ publication.estimatedCasualties.displaced ?? 0 }}</div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="text-center text-gray-300 py-12">Cargando publicación...</div>
    </template>
  </div>
</template>
<script setup>
import { inject } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import api from "../../axios";

// Props: si viene como tarjeta
const props = defineProps({
  publication: Object,
  //   user: Object,
});


const router = useRouter();
const route = useRoute();
const publication = ref(props.publication ?? null);
const mensaje = ref("");
const error = ref("");
const idAlert = ref("");

// Helpers (same as in UserHomeView)
const formatDate = (value) => {
  if (!value) return "-";
  try {
    const d = new Date(value);
    return d.toLocaleString();
  } catch (e) {
    return value;
  }
};
const formatCoordinates = (coords) => {
  if (!coords || !Array.isArray(coords) || coords.length < 2) return "-";
  const [lng, lat] = coords;
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};

// Try to populate publication from props, then sessionStorage, then API by id
onMounted(async () => {
  if (publication.value) return;

  // Try sessionStorage
  try {
    const raw = sessionStorage.getItem('selectedAlert');
    if (raw) {
      publication.value = JSON.parse(raw);
      idAlert.value = publication.value.id;
      return;
    }
  } catch (e) {
    console.warn('No se pudo leer selectedAlert from sessionStorage', e);
  }

  // Fallback: fetch by id if route has id param
  const id = route.params.id;
  if (id) {
    try {
      const resp = await api.get(`/alertas/${id}`);
      publication.value = resp.data?.data || resp.data;
    } catch (e) {
      console.error('Error fetch alert by id', e);
      error.value = 'No se pudo cargar la publicación';
    }
  }
});
 






</script>
