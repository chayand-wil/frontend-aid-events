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

  <div
    class="mt-24 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white"
  >
    <div class="p-4 max-w-2xl">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Crear evento para donaciones</h2>
        <button
          type="button"
          @click="isOpen = !isOpen"
          :aria-expanded="isOpen.toString()"
          class="ml-4 px-3 py-1 border rounded bg-white/5"
        >
          <span v-if="!isOpen">Crear un evento</span>
          <span v-else>Ocultar formulario</span>
        </button>
      </div>

      <transition name="fade">
        <form v-show="isOpen" @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium" style="color: #7b1f2f"
              >Catastrophe ID
            </label>
            <input
              type="text"
              :value="idAlert"
              disabled
              style="color: #7b1f2f"
              class="mt-1 block w-full border rounded px-2 py-1 bg-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium" style="color: #7b1f2f"
              >Título</label
            >
            <input
              v-model="title"
              placeholder="Eventoo"
              type="text"
              required
              style="color: #7b1f2f"
              class="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label class="block text-sm font-medium" style="color: #7b1f2f"
              >Descripción</label
            >
            <textarea
              v-model="description"
              placeholder="Fuertemente..."
              rows="4"
              style="color: #7b1f2f"
              class="mt-1 block w-full border rounded px-2 py-1"
            ></textarea>
          </div>

          <!-- Estado visible y tooltip de más detalles -->
          <div class="flex items-center gap-2 mt-1">
            <span class="inline-block text-sm font-semibold px-2 py-1 rounded" style="background:#fee2e2; color:#7b1f2f">
              Estado: {{ status }}
            </span>

            <!-- icono con tooltip CSS -->
            <div class="relative inline-block group">
              <button type="button" class="w-6 h-6 flex items-center justify-center rounded-full bg-white/10" aria-label="Más detalles">
                <!-- simple SVG info icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
                </svg>
              </button>
              <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 p-2 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100" style="z-index:50">
                El estado se podrá cambiar después de agregar un requerimiento.
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium" style="color: #7b1f2f"
              >Fecha inicio</label
            >
            <input
              v-model="startDateInput"
              :min="minStartLocal"
              type="datetime-local"
              required
              style="color: #7b1f2f"
              class="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label class="block text-sm font-medium" style="color: #7b1f2f"
              >Fecha fin (mínimo 20 días desde inicio)</label
            >
            <input
              v-model="endDateInput"
              type="datetime-local"
              required
              style="color: #7b1f2f"
              class="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>

          <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

          <div>
            <button
              :disabled="isSubmitting"
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {{ isSubmitting ? "Creando..." : "Crear evento" }}
            </button>
          </div>
        </form>
      </transition>

      <!-- <div v-if="eventCreated" class="mt-6 p-4 border rounded bg-green-50">
        <h3 class="font-medium">Evento creado</h3>
        <pre class="text-sm mt-2">{{ eventCreated }}</pre>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import { createEvents } from "../../services/event";

// helper to format date for input[type=datetime-local]
function toLocalDateTimeInput(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

const route = useRoute();
const idAlert = ref(null);
const eventCreated = ref(null);

// form state
const title = ref("");
const description = ref("");
const startDateInput = ref("");
const endDateInput = ref("");
const error = ref("");
const isSubmitting = ref(false);
const isOpen = ref(false);
const status = ref('PLANIFICACION');
const mensaje = ref("");

// minimum start date is now
const minStartLocal = computed(() =>
  toLocalDateTimeInput(new Date().toISOString())
);

async function algo() {
  idAlert.value = route.params.id;
}

function validateDates() {
  error.value = "";
  if (!startDateInput.value || !endDateInput.value) {
    error.value = "Debe completar las fechas.";
    return false;
  }

  const start = new Date(startDateInput.value);
  const end = new Date(endDateInput.value);
  const now = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    error.value = "Formato de fecha inválido.";
    return false;
  }

  if (start < now) {
    error.value = "La fecha de inicio no puede ser menor a la fecha actual.";
    return false;
  }

  const minEnd = new Date(start.getTime() + 20 * 24 * 60 * 60 * 1000); // +20 days
  if (end < minEnd) {
    error.value =
      "La fecha de fin debe ser al menos 20 días después de la fecha de inicio.";
    return false;
  }

  return true;
}

async function handleSubmit() {
  error.value = "";
  if (!validateDates()) return;
  isSubmitting.value = true;

  try {
    const payload = {
      title: title.value,
      description: description.value,
    //   status: "PLANIFICACION",
      status: "ACTIVO",
      startDate: new Date(startDateInput.value).toISOString(),
      endDate: new Date(endDateInput.value).toISOString(),
      catastropheId: idAlert.value,
      type: "EMERGENCY_AID",
    };

    const res = await createEvents(payload);
    // createEvents returns response.data in service — store it in eventCreated
    eventCreated.value = res;
    // show success message using the provided floating container
    mensaje.value = `Evento creado: ${title.value || 'sin título'}`;
    // clear any previous error
    error.value = '';
    // reset form fields
    title.value = '';
    description.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
    // clear message after 4 seconds
    setTimeout(() => {
      mensaje.value = '';
    }, 4000);
  } catch (err) {
    console.error("Error creando evento:", err);
    error.value = err?.response?.data?.message || "Error al crear el evento.";
    // clear success message if any
    mensaje.value = '';
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  algo();
});
</script>
