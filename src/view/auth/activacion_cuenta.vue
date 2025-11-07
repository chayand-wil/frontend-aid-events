<template>
  <div class="fixed top-20 right-40 z-50 space-y-4 w-[300px]">
    <!-- Mensaje de éxito -->
    <div
      v-if="mensaje"
      class="bg-white/20 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-verdee"
    >
      {{ mensaje }}
    </div>
    <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
  </div>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-500 bg-opacity-20 backdrop-blur-sm"
  >
    <div
      class="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-green-400"
    >
      <div class="text-center text-2xl text-white mb-4">
        <h1>Confirmacion de la cuenta</h1>
      </div>
      <p>
        A continuación, ingresa el código de activación que te enviamos a tu
        correo
      </p>

      <div class="relative w-full mt-1">
        <input
          v-model="code"
          @focus="focus_code = true"
          @blur="focus_code = false"
          type="text"
          id="mail"
          placeholder=" "
          required
          class="peer w-full h-14 px-6 rounded-md bg-neutral-800 text-white text-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label
          :class="[
            'absolute left-6 transition-all',
            focus_mail || code
              ? 'top-0.5 text-base text-xs text-blue-500'
              : 'top-4 text-lg text-gray-500',
          ]"
          for="mail"
        >
          Ingrese el codigo de activacion
        </label>
      </div>

      <p v-if="SubmitEvent && !code" class="text-red-600 text-sm">
        Debes introducir un codigo valido
      </p>

      <button
        @click="validate_code"
        class="mt-2 w-full text-green-400 border border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
      >
        Verificar Cuenta
      </button>
      <button
        @click="send_again"
        class="mt-2 w-full text-green-400 border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
      >
        no recibiste el codigo?, click aqui
      </button>

      <p class="text-2xl text-center">
        <router-link to="/register">Registrate ahora!</router-link>
      </p>

      <button
        class="block mx-auto text-xm text-black mt-4"
        @click="router.push('/')"
      >
        Seguir como invitado
      </button>

      <button
        class="block mx-auto text-xm text-black mt-4"
        @click="router.push('/send_code')"
      >
        Recuperar contrasena
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from "../../axios"

import { useRouter } from "vue-router"
import { useRoute } from "vue-router"

const router = useRouter();
const route = useRoute();
const focus_code = ref(false);
const mensaje = ref('');
const email = ref('');
const code = ref('');
const error = ref('');

const SubmitEvent = ref(false);

onMounted(async () => {
  const id = route.params.email;
  if (id) {
    email.value = id;
  }
});

const validate_code = async () => {
  SubmitEvent.value = true;
  if (!email.value) {
    router.push("/login");
  } else {
    try {
      const response = await api.post("/active-user", {
        email: email.value,
        code: code.value,
      });
      mensaje.value = response?.data?.message || "Cuenta activada con exito";
      // if (response.status === 200) {
      // }
      setTimeout(() => {
        mensaje.value = '' // opcional, si quieres limpiar el mensaje
        router.push("/login")
      }, 3000)
    } catch (err) {
      error.value = err?.response?.data?.message || "Coooodigo incorrecto";

      // console.error("Error during login:" + err);
    }
  }
};

const send_again = async () => {
  SubmitEvent.value = true;
  if (!email.value) {
    router.push("/login");
  } else {
    try {
      const response = await api.post("/send-code", {
        email: email.value,
      });
      mensaje.value = response?.data?.message || "Codigo enviade de nuevo";
      if (response.status === 200) {
      }
    } catch (err) {
      error.value = err?.response?.data?.message || "Coooodigo incorrecto";
      // console.error("Error during login:" + err);
    }
  }
};
</script>
