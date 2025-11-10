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
    class="mt-1 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white"
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
            <span
              class="inline-block text-sm font-semibold px-2 py-1 rounded"
              style="background: #fee2e2; color: #7b1f2f"
            >
              Estado: {{ status }}
            </span>

            <!-- icono con tooltip CSS -->
            <div class="relative inline-block group">
              <button
                type="button"
                class="w-6 h-6 flex items-center justify-center rounded-full bg-white/10"
                aria-label="Más detalles"
              >
                <!-- simple SVG info icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
                  />
                </svg>
              </button>
              <div
                class="absolute left-1/2 -translate-x-1/2 mt-2 w-56 p-2 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100"
                style="z-index: 50"
              >
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
    </div>
  </div>
  <div
    class="mt-4 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white"
  >
    <!-- Lista de eventos relacionados con la alerta -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold mb-2">Eventos relacionados</h3>
      <div v-if="loadingEvents" class="text-sm">Cargando eventos...</div>
      <div v-else-if="eventsList.length === 0" class="text-sm text-gray-300">
        No hay eventos para esta alerta.
      </div>
      <ul v-else class="space-y-3">
        <li
          v-for="ev in eventsList"
          :key="ev.id || ev._id || ev.title"
          class="p-3 bg-white/5 rounded"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium">
                {{ ev.title || ev.name || "Sin título" }}
              </div>
              <div class="text-xs text-gray-300">
                {{ ev.description || ev.desc || "" }}
              </div>
            </div>
            <div class="text-right text-xs flex flex-col items-end gap-2">
              <div>
                Estado:
                <span class="font-semibold">{{
                  ev.status || ev.estado || "N/A"
                }}</span>
              </div>
              <div class="text-gray-400">
                {{ formatDate(ev.startDate) }} → {{ formatDate(ev.endDate) }}
              </div>
              <div>
                <button @click="openRequirementModal(ev)" type="button" class="mt-2 text-sm px-2 py-1 bg-white/5 rounded">Editar</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- Modal para agregar requerimiento -->
  <div v-if="showReqModal" class="fixed inset-0 z-60 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="closeRequirementModal"></div>
    <div class="relative bg-white text-black rounded-lg p-6 w-full max-w-md z-70">
      <h3 class="text-lg font-medium mb-4">Agregar requerimiento para: {{ modalEvent?.title || modalEvent?.name || modalEvent?.eventId }}</h3>

      <div class="space-y-3">
        <div>
          <label class="block text-sm font-medium">Tipo de requerimiento</label>
          <select v-model="requirementType" class="mt-1 block w-full border rounded px-2 py-1">
            <option value="">Seleccione...</option>
            <option v-for="t in requirementTypes" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </div>

        <div v-if="requirementType === 'AGE'">
          <label class="block text-sm font-medium">Edad mínima</label>
          <input v-model.number="requirementValue" type="number" min="0" class="mt-1 block w-full border rounded px-2 py-1" />
        </div>

        <div v-if="requirementType === 'GENDER'">
          <label class="block text-sm font-medium">Género</label>
          <select v-model="requirementValue" class="mt-1 block w-full border rounded px-2 py-1">
            <option value="">Seleccione...</option>
            <option v-for="g in genders" :key="g" :value="g">{{ g }}</option>
          </select>
        </div>

        <div v-if="requirementType === 'PROFESSION'">
          <label class="block text-sm font-medium">Profesión</label>
          <select v-model="requirementValue" class="mt-1 block w-full border rounded px-2 py-1">
            <option value="">Seleccione...</option>
            <option v-for="p in professions" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>

        <div v-if="requirementType === 'LOCATION'">
          <label class="block text-sm font-medium">Dirección</label>
          <select v-model="requirementValue" class="mt-1 block w-full border rounded px-2 py-1">
            <option value="">Seleccione...</option>
            <option v-for="l in locations" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>

        <div v-if="requirementType === 'BLOOD_TYPE'">
          <label class="block text-sm font-medium">Tipo de sangre</label>
          <select v-model="requirementValue" class="mt-1 block w-full border rounded px-2 py-1">
            <option value="">Seleccione...</option>
            <option v-for="b in bloodTypes" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>

        <div class="flex items-center justify-end gap-2 mt-4">
          <button type="button" @click="closeRequirementModal" class="px-3 py-1 rounded border">Cancelar</button>
          <button type="button" @click="submitRequirement" class="px-3 py-1 bg-blue-600 text-white rounded">+ Agregar requerimiento</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import { createEvents, fetchEventsByAlert, createRequirement, updateEvents } from "../../services/event";

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

function formatDate(isoString) {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    return d.toLocaleString();
  } catch (e) {
    return isoString;
  }
}

const route = useRoute();
const idAlert = ref(null);
const eventCreated = ref(null);
const eventsList = ref([]);
const loadingEvents = ref(false);

// requirement modal state
const showReqModal = ref(false);
const modalEvent = ref(null);
const requirementType = ref("");
const requirementValue = ref("");

const requirementTypes = [
  { label: "Edad", value: "AGE" },
  { label: "Género", value: "GENDER" },
  { label: "Profesión", value: "PROFESSION" },
  { label: "Dirección", value: "LOCATION" },
  { label: "Tipo de sangre", value: "BLOOD_TYPE" },
];

const genders = ["Masculino", "Femenino"];
const professions = ["Electricista","Albañil","Enfermero","Doctor","Psicologo","Ingeniero","Desarrollador","Bombero"];
const locations = ["Guatemala","Mexico"];
const bloodTypes = ["O+","O-","A+","A-","B+","B-","AB+","AB-"];

function openRequirementModal(ev) {
  modalEvent.value = ev;
  requirementType.value = "";
  requirementValue.value = "";
  showReqModal.value = true;
}

function closeRequirementModal() {
  showReqModal.value = false;
  modalEvent.value = null;
}

function requirementKeyFromType(type) {
  switch (type) {
    case 'AGE': return 'MIN_AGE';
    case 'GENDER': return 'GENDER';
    case 'PROFESSION': return 'PROFESSION';
    case 'LOCATION': return 'LOCATION';
    case 'BLOOD_TYPE': return 'BLOOD_TYPE';
    default: return type;
  }
}

async function submitRequirement() {
  error.value = '';
  if (!modalEvent.value) return;
  if (!requirementType.value) { error.value = 'Seleccione un tipo de requerimiento.'; return; }
  if (!requirementValue.value && requirementValue.value !== 0) { error.value = 'Ingrese el valor del requerimiento.'; return; }

  const payload = {
    eventId: modalEvent.value.id || modalEvent.value._id || modalEvent.value.eventId || modalEvent.value.idEvent,
    requirementKey: requirementKeyFromType(requirementType.value),
    requiredValue: String(requirementValue.value),
  };

  try {
    await createRequirement(payload);
    // si se creó el requerimiento, actualizar el estado del evento a ACTIVO
    try {
        alert('iddd: ' + payload.eventId);
      await updateEvents(payload.eventId, { status: 'ACTIVO' });
      mensaje.value = 'Requerimiento agregado y evento activado.';
    } catch (updateErr) {
      console.error('Error actualizando estado del evento:', updateErr);
      // aunque falle la actualización del estado, informar que el requerimiento se creó
      mensaje.value = 'Requerimiento agregado (falló actualizar estado).';
    }
    // reset modal
    closeRequirementModal();
    // reload events
    await loadEvents();
    setTimeout(() => (mensaje.value = ''), 4000);
  } catch (err) {
    console.error('Error creando requerimiento:', err);
    error.value = err?.response?.data?.message || 'Error al agregar el requerimiento.';
  }
}

// form state
const title = ref("");
const description = ref("");
const startDateInput = ref("");
const endDateInput = ref("");
const error = ref("");
const isSubmitting = ref(false);
const isOpen = ref(false);
const status = ref("PLANIFICACION");
const mensaje = ref("");

// minimum start date is now
const minStartLocal = computed(() =>
  toLocalDateTimeInput(new Date().toISOString())
);

async function algo() {
  idAlert.value = route.params.idAlert || route.params.id;
  // cargar eventos relacionados
  if (idAlert.value) await loadEvents();
}

async function loadEvents() {
  loadingEvents.value = true;
  try {
    const res = await fetchEventsByAlert(idAlert.value);
    console.log("Eventos cargados:", res);
    // Normalizar respuesta: la API puede devolver array directamente, o { data: [...] }, o { data: { data: [...] } }
    let data = res;
    if (res && typeof res === "object") {
      // axios layer sometimes returns { data: ... }
      if (Array.isArray(res)) {
        data = res;
      } else if (Array.isArray(res.data)) {
        data = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        data = res.data.data;
      } else if (Array.isArray(res.data?.data?.data)) {
        data = res.data.data.data;
      } else {
        // fallback: try to find first array inside object
        const found = Object.values(res).find((v) => Array.isArray(v));
        if (found) data = found;
        else data = [];
      }
    }
    eventsList.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error cargando eventos por alerta:", err);
    error.value =
      err?.response?.data?.message || "No se pudieron cargar los eventos.";
  } finally {
    loadingEvents.value = false;
  }
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
        status: "PLANIFICACION",
    //   status: "ACTIVO",
      startDate: new Date(startDateInput.value).toISOString(),
      endDate: new Date(endDateInput.value).toISOString(),
      catastropheId: idAlert.value,
      type: "EMERGENCY_AID",
    };

    const res = await createEvents(payload);
    // createEvents returns response.data in service — store it in eventCreated
    eventCreated.value = res;
    // show success message using the provided floating container
    mensaje.value = `Evento creado: ${title.value || "sin título"}`;
    // clear any previous error
    error.value = "";
    // reset form fields
    title.value = "";
    description.value = "";
    startDateInput.value = "";
    endDateInput.value = "";
    // recargar la lista de eventos tras crear uno nuevo
    await loadEvents();
    // clear message after 4 seconds
    setTimeout(() => {
      mensaje.value = "";
    }, 4000);
  } catch (err) {
    console.error("Error creando evento:", err);
    error.value = err?.response?.data?.message || "Error al crear el evento.";
    // clear success message if any
    mensaje.value = "";
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  algo();
});
</script>
