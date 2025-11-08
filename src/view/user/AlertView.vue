<template>
  <!-- Mensaje de éxito -->
  <div
    v-if="successMessage"
    class="bg-white/20 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-verdee"
  >
    {{ successMessage }}
  </div>

  <!-- Mensaje de error de validación -->
  <div
    v-if="errorMessage"
    class="mt-40 bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-red-600"
  >
    {{ errorMessage }}
  </div>
   
  <!-- Contenedor principal centrado -->
  <div class="max-w-4xl mx-auto px-4"> </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../axios";

const router = useRouter();
const errorMessage = ref("");
const successMessage = ref("");

// GET /alertas
const getAlertas = async () => {
  try {
    const response = await api.get("/alertas");
    console.log(response.data);
    successMessage.value = "Alertas obtenidas con éxito";
  } catch (error) {
    errorMessage.value = "Error al obtener alertas";
  }
};

onMounted(() => {
  getAlertas();
});

</script>

 