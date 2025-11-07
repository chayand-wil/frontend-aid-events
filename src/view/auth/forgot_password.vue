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
      <div class="color: verdee"></div>

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
      <p>Correo electrónico ingresado</p>

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

      <button
        @click="validate_again"
        class="mt-2 w-full text-black px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
      >
        no recibiste el codigo?, volver a interntarlo
      </button>

      <p>Ingresa el codigo que te hemos enviado</p>

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
            focus_code || code
              ? 'top-0.5 text-base text-xs text-blue-500'
              : 'top-4 text-lg text-gray-500',
          ]"
          for="mail"
        >
          123123
        </label>
      </div>

      <p v-if="SubmitEvent && !code" class="text-red-600 text-sm">
        Debes introducir un codigo valido
      </p>

      <p>Ingresa la contrasena nueva</p>
      <div class="relative w-full mt-1">
        <input
          v-model="password"
          @focus="focus_password = true"
          @blur="focus_password = false"
          type="password"
          id="password"
          placeholder=" "
          required
           autocomplete="new-password"
          class="peer w-full h-14 px-6 rounded-md bg-neutral-800 text-white text-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label
          :class="[
            'absolute left-6 transition-all',
            focus_password || password
              ? 'top-0.5 text-base text-xs text-blue-500'
              : 'top-4 text-lg text-gray-500',
          ]"
          for="password"
        >
          wilAdmin123.
        </label>
      </div>
      <p v-if="SubmitEvent && !password" class="text-red-600 text-sm">
        Debes introducir una contrasena segura Abc1234.
      </p>

      <button
        @click="change_password"
        class="mt-2 w-full border border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
      >
        Cambiar contrasena
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
import { ref, onMounted } from 'vue'
import api from '../../axios'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const focus_mail = ref(false)
const focus_code = ref(false)
const focus_password = ref(false)
const mensaje = ref('')
const email = ref('')
const password = ref('')
const code = ref('')
const error = ref('')

const SubmitEvent = ref(false)

onMounted(async () => {
  const id = route.params.email
  if (id) {
    email.value = id
  }
  password.value = ''
})

const change_password = async () => {
  SubmitEvent.value = true
  if (!email.value || !code.value) {
    router.push('/login')
  } else {
    try {
      const response = await api.post('/password-recovery', {
        email: email.value,
        code: code.value,
        password: password.value,
      })
      mensaje.value = response?.data?.message || 'Cambio de contrasena Exitoso w'
      if (response.status === 200) {
      }




      
      router.push('/login')
    } catch (err) {
      // password.value = ''
      // code.value = ''
      error.value = err?.response?.data?.message || 'Error al cambiar la contrasena w'
      // console.error('Error during login:' + err)
    }
  }
}

const validate_again = async () => {
  SubmitEvent.value = true
  if (!email.value) {
    router.push('/login')
  } else {
    try {
      const response = await api.post('/send-code', {
        email: email.value,
      })
      mensaje.value = response?.data?.message || 'Codigo enviade de nuevo'
      if (response.status === 200) {
      }

      const role = localStorage.getItem('role')
    } catch (err) {
      error.value = err?.response?.data?.message || 'Error al enviar solcitar el codigo de nuevo'
      // console.error("Error during login:" + err)
    }
  }
}
</script>
