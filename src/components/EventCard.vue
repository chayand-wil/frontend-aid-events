<template>
  <!-- Tarjeta de publicación -->
  <div
    class="w-72 aspect-square bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg text-white flex-shrink-0"
  >
    <!-- Cabecera -->
    <div
      class="px-4 pt-4 flex justify-between items-center text-sm text-gray-400"
    >
      <p>{{ publication?.title }}</p>
      <button @click="modalVisible = true">
        
      </button>
    </div>

    <!-- Descripción -->
    <div class="px-4 py-1 text-sm text-white">
      <p>{{ publication?.type }}</p>
    </div>

    <!-- Imagen con overlay -->
    <div @click.stop="emitirDetalle" class="relative w-full group">
      <img
        :src="publication?.publication?.image"
        alt="Publicación"
        class="w-full h-64 object-cover rounded cursor-pointer"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      ></div>
    </div>

    <!-- Estado -->
    <div class="mt-2 px-4 text-sm pb-1 text-green-400">
      <!-- Estado: {{ publication.article.estado_adquisicion.nombre }} -->
    </div>

    <!-- Acciones -->
    <div class="px-4 py-3 flex justify-between text-x border-t border-gray-700">
      <span>{{ formatFecha(publication?.start_date) }}</span>

           
        
 
    </div>
  </div>

  <!-- <DenunciaModal
    :show="modalVisible"
    :opciones="motivos"
    @close="modalVisible = false"
    @cargar-Denuncia="setConfiguracion"
  /> -->
</template>

<script setup>
import { ref } from "vue";
import DenunciaModal from "@/components/ModalWishList.vue";
const { publication } = defineProps(["publication", "motivos"]);

const modalVisible = ref(false);
const emit = defineEmits(["cargar-Publication", "crear-Denuncia"]);

const id_publicacion = ref(false);
const id_motivo = ref(false);

function emitirDetalle() {
  emit("cargar-Publication", publication.publication.id);
}

function setConfiguracion(id) {
  modalVisible.value = false;
  emit("crear-Denuncia", publication.id, id);
}

function formatFecha(fechaRaw) {
  if (!fechaRaw) return "Sin fecha";
  const fechaISO = fechaRaw.replace(" ", "T"); // Convierte a formato ISO
  const fecha = new Date(fechaISO);
  return isNaN(fecha) ? "Fecha no válida" : fecha.toLocaleString("es-ES");
}


</script>
