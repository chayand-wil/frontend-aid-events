<template>
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-center">
      <h2 class="text-lg font-semibold mb-4 text-white">Completar la compra</h2>
    </div>

    <!-- Mensajes de error -->
    <div class="fixed top-20 right-40 z-50 space-y-4 w-[300px]">
      <!-- Mensaje de éxito -->
      <div
        v-if="successMessage"
        class="bg-white backdrop-blur-xs rounded-2xl p-10 shadow-lg text-xl text-verdee"
      >
        {{ successMessage }}
      </div>

      <!-- Mensaje de error de validación -->
      <div
        v-if="errorMessage"
        class="bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-red-600"
      >
        {{ errorMessage }}
      </div>
    </div>

  

 
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const errorMessage = ref("");
const successMessage = ref("");
 

 
</script>
