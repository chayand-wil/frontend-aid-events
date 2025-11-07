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
import PublicationCard from "@/components/PublicationCard.vue";

const router = useRouter();
const errorMessage = ref("");
const successMessage = ref("");
const user = ref(null);
const loggued = ref(false);
const showModal = ref(false);


const publications = ref([]);
const carousel = ref(null);
 


</script>

<style>
/* Oculta el scrollbar (todos los navegadores) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
