<template>
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
    class="min-h-screen flex items-center justify-center bg-gray-500 bg-opacity-20 backdrop-blur-sm"
  >
    <div
      class="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-green-400"
    >
      <img
        src="@/assets/logo_bueno_para.png"
        alt="Logo"
        class="mx-auto h-64 w-auto"
      />
      <button>
        <router-link to="/login">Volver a intentar, Iniciar sesión</router-link>
      </button>

      <button
        class="block mx-auto text-xm text-black mt-4 mb-10"
        @click="router.push('/')"
      >
        Seguir como invitado
      </button>
      <p>Ingresa el correo electrónico registrado</p>

      <div class="relative w-full mt-1">
        <input
          v-model="email"
          @focus="focus_mail = true"
          @blur="focus_mail = false"
          type="text"
          id="mail"
          placeholder=" "
          required
          class="peer w-full h-14 px-6 rounded-md bg-neutral-800 text-white text-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label
          :class="[
            'absolute left-6 transition-all',
            focus_mail || email
              ? 'top-0.5 text-base text-xs text-blue-500'
              : 'top-4 text-lg text-gray-500',
          ]"
          for="mail"
        >
          user123@wil.com
        </label>
      </div>
      <p v-if="SubmitEvent && !email" class="text-red-600 text-sm">Introduce la contrasenia</p>

      <button
        @click="send_code"
        class="mt-2 w-full border border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
      >
        Enviar codigo
      </button>

      <br />
      <br />
      <p class="text-2xl text-center">
        <router-link to="/register">Registrate ahora!</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../axios';

const router = useRouter();
const focus_mail = ref(false);
const mensaje = ref('');
const email = ref('');
const error = ref('');

const SubmitEvent = ref(false);

const send_code = async () => {
  SubmitEvent.value = true;
  if (!email.value) {
    error.value = 'Ingrese un correo electronico registrado';
  } else {
    try {
      const response = await api.post('/send-code', {
        email: email.value,
      });
      mensaje.value = response?.data?.message || 'Se ha enviado el codigo';
      // if (response.status === 200) {
      // }
      const algo = email.value;
      router.push({ name: 'recover_password', params: { email: algo } });
    } catch (err) {
      error.value = err?.response?.data?.message || 'Correo no registrado w';
      // console.error("Error during login:" + err);
      
    }
  }
};
</script>
