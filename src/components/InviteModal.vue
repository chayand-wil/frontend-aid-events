<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click="handleOverlayClick"
  >
    <div
      ref="modalBox"
      class=" rounded-2xl shadow-lg w-96 p-6"
      @click.stop
    >
      <div class="bg-gray-900 rounded-2xl shadow-lg w-96 p-6">
        <h2 class="text-xl font-bold mb-4 text-center">¡Bienvenido!</h2>
        <p class="text-gray-600 mb-6 text-center">
          Para continuar, por favor elige una opción:
        </p>

        <div class="flex flex-col gap-3">
          <button
            @click="emitAction('login')"
            class="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
          <button
            @click="emitAction('register')"
            class="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Regístrate
          </button>
          <button
            @click="emitAction('guest')"
            class="bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
          >
            Continuar como Invitado
          </button>
        </div>
 
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close", "action"]);

function close() {
  emit("close");
}

function emitAction(action) {
  emit("action", action);
  close();
}

function handleOverlayClick(event) {
  // Si el click es en el overlay (fondo), cerrar modal
  if (event.target === event.currentTarget) {
    close();
  }
}
</script>
