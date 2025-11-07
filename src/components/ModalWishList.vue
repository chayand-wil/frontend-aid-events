<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-gray-600 text-white p-6 rounded-lg w-full max-w-md">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">Agregar a la lista de Deseos</h2>
        <button @click="$emit('close')" class="text-white text-xl">&times;</button>
      </div>

      <p class="text-sm text-black mb-4">
        <span class="text-gray-400"> <a href="#" class="">Mas adelante lo podras ver entrando a tu carrito</a>. </span>
      </p>

      <!-- Opciones -->
      <div class="space-y-2 mb-6">
 

 
      <!-- Botón Enviar -->
      <button
        class="w-full bg-black hover:bg-gray-700 transition-all text-white py-2 rounded disabled:opacity-50"
        @click="agregarALista"
      >
        Enviar
      </button>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  show: Boolean,
  opciones: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['close', 'agregar-wishlist'])

const seleccionada = ref('')

function agregarALista() {
  emit('agregar-wishlist')
}
</script>
