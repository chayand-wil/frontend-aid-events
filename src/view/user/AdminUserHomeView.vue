<template>
  <!-- Mensaje de éxito -->
  <div
    v-if="successMessage"
    class="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-lg text-verdee max-w-4xl mx-auto my-4"
  >
    {{ successMessage }}
  </div>

  <!-- Mensaje de error de validación -->
  <div
    v-if="errorMessage"
    class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-lg text-red-600 max-w-4xl mx-auto my-4"
  >
    {{ errorMessage }}
  </div>

  <div class="max-w-4xl mx-auto px-4">
    <!-- Estado de carga -->
    <div v-if="loading" class="text-center py-12 text-gray-300">
      Cargando alertas...
    </div>

    <div v-else>
      <div v-if="alerts.length === 0" class="text-center py-12 text-gray-400">
        No hay alertas disponibles
      </div>

      <div class="space-y-6">
        <div
          v-for="alert in alerts"
          :key="alert.id"
          class="bg-white/5 backdrop-blur rounded-2xl p-6 shadow-lg cursor-pointer"
          @click="toggleDetails(alert.id)"
        >
          <div class="flex justify-between items-start gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-3">
                <div>
                  <h3 class="text-xl font-semibold text-white">
                    {{ (alert.eventType || alert.eventId || 'Alerta sin título') }}
                  </h3>
                  <div class="text-sm text-gray-400">ID: {{ alert.eventId || alert.id }}</div>
                </div>
                <span
                  :class="statusClass(alert.status)"
                  class="text-sm font-medium px-3 py-1 rounded-full ml-2"
                >
                  {{ (alert.status || "unknown").toUpperCase() }}
                </span>
              </div>

              <p class="text-sm text-gray-300 mt-2">
                {{ alert.description || 'Sin descripción' }}
              </p>
              <div class="mt-3 text-sm text-gray-400 flex gap-4">
                <span>Inicio: {{ formatDate(alert.startDate || alert.createdAt) }}</span>
                <span v-if="alert.endDate">· Fin: {{ formatDate(alert.endDate) }}</span>
                <span v-if="alert.country">· País: {{ alert.country }}</span>
                <span v-if="hasCoordinates(alert)">· Coords: {{ formatCoordinates(alert.location.coordinates) }}</span>
              </div>
            </div>

            <div class="flex-shrink-0 text-right">
              <div class="text-sm text-gray-400">Ver más</div>
              <div
                class="text-2xl text-gray-400 mt-1 transform transition-transform duration-200"
                :class="{ 'rotate-90': expandedId === alert.id }"
              >
                ▸
              </div>
            </div>
          </div>

          <transition name="fade">
            <div
              v-if="expandedId === alert.id"
              class="details mt-4 border-t border-white/10 pt-4 text-gray-200"
            >
              <p class="mb-2">
                {{ alert.description || "No hay más detalles proporcionados." }}
              </p>
              <div class="text-sm text-gray-400 space-y-2">
                <div v-if="alert.estimatedCasualties">
                  <div class="font-medium text-gray-200">Estimación de víctimas</div>
                  <div>Muertes: {{ alert.estimatedCasualties.deaths ?? 0 }}</div>
                  <div>Heridos: {{ alert.estimatedCasualties.injuries ?? 0 }}</div>
                  <div>Desplazados: {{ alert.estimatedCasualties.displaced ?? 0 }}</div>
                </div>
                <div>Categoria: {{ alert.category }}</div>
                <div>Fuente: {{ alert.source }}</div>
                <div>Creado: {{ formatDate(alert.createdAt) }} · Actualizado: {{ formatDate(alert.updatedAt) }}</div>
                <div class="mt-3">
                  <button
                    @click.stop="participar(alert)"
                    class="bg-verdee text-white px-4 py-2 rounded-md hover:brightness-95 transition"
                  >
                    Ver Eventos
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import api from "../../axios";
import { useRouter } from "vue-router";
const router = useRouter();
const errorMessage = ref("");
const alerts = ref([]);
const loading = ref(false);
const successMessage = ref("");
// Solo un id expandido a la vez
const expandedId = ref(null);

// Helper: formato de fecha sencillo
const formatDate = (value) => {
  if (!value) return "-";
  try {
    const d = new Date(value);
    return d.toLocaleString();
  } catch (e) {
    return value;
  }
};

// Formatea coordenadas [lng, lat] -> "lat, lng"
const formatCoordinates = (coords) => {
  if (!coords || !Array.isArray(coords) || coords.length < 2) return "-";
  const [lng, lat] = coords;
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};

const hasCoordinates = (alert) => {
  return alert?.location?.coordinates && Array.isArray(alert.location.coordinates) && alert.location.coordinates.length >= 2;
};

// Status -> clases de color (tailwind)
const statusClass = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("urgent") || s.includes("critical") || s === "danger" || s === 'activo')
    return "bg-red-600 text-white";
  if (s.includes("warning") || s === "pending" || s === 'alerta')
    return "bg-yellow-500 text-black";
  if (s.includes("ok") || s.includes("info") || s === "normal" || s === 'resuelto' || s === 'cerrado')
    return "bg-green-600 text-white";
  return "bg-gray-500 text-white";
};

// Toggle detalles por id (solo uno abierto a la vez)
const toggleDetails = (id) => {
  expandedId.value = expandedId.value === id ? null : id;
};

// Enviar objeto a PublicationView como prop via history.state (sin sessionStorage)
const participar = (alert) => {
  // Asegúrate de que la ruta 'emergencia' esté configurada para recibir props desde history.state
  router.push({ name: "admin_emergencia", params: { id: alert.eventId }});
};

// GET /alertas
const getAlertas = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await api.get("/alertas");
    // Asumimos que la API devuelve un array en response.data
    alerts.value = Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];
    successMessage.value = alerts.value.length
      ? "Alertas obtenidas con éxito"
      : "No se encontraron alertas";
  } catch (error) {
    console.error(error);
    errorMessage.value = "Error al obtener alertas";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getAlertas();
});
</script>

<style scoped>
/* Smooth & quick expand/collapse for details panel (200ms) */
.details {
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: max-height 200ms ease, opacity 200ms ease, transform 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}
.fade-enter-to,
.fade-leave-from {
  max-height: 800px; /* suficiente para el contenido */
  opacity: 1;
  transform: translateY(0);
}

/* ensure the arrow rotation is smooth (tailwind classes also help) */
.rotate-90 {
  transform: rotate(90deg) !important;
}
</style>
