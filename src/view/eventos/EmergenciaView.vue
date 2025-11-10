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
  ></div>
  <div
    class="mt-4 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white"
  >
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
 


onMounted(() => {
  algo();
});
</script>
