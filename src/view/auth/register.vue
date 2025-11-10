<template>
  <!-- <div class="min-h-screen flex items-center justify-center bg-gray-500 px-4"> -->
  <div
    class="min-h-screen flex items-center justify-center bg-gray-500 bg-opacity-20 backdrop-blur-sm"
  >
    <!-- Contenedor con bordes redondeados -->
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
      class="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-white"
    >
      <h1>Crear tu cuenta en Bueno para mas nada</h1>
      <br />
      <p class="text-2xl text-center text-gray-400">
        <router-link to="/login">Iniciar Sesion</router-link>
      </p>
      <br />
      <form @submit.prevent="crearUsuario" autocomplete="off">
        <div class="flex space-x-4 w-full">
          <div class="relative w-1/2">
            <input
              v-model="nuevo.name"
              @focus="focus_name = true"
              @blur="focus_name = false"
              type="text"
              id="nombre"
              placeholder=""
              required
              class="peer w-full h-14 px-6 rounded-md bg-neutral-800 text-white text-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              :class="[
                'absolute left-6 transition-all',
                focus_name || nuevo.name
                  ? 'top-0.5 text-base text-xs text-blue-500'
                  : 'top-4 text-lg text-gray-500',
              ]"
              for="nombre"
            >
              Nombre
            </label>
          </div>

          <div class="relative w-1/2">
            <input
              v-model="nuevo.name"
              @focus="focus_lastname = true"
              @blur="focus_lastname = false"
              type="text"
              id="apellido"
              placeholder=" "
              class="peer w-full h-14 px-6 rounded-md bg-neutral-800 text-white text-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              :class="[
                'absolute left-6 transition-all',
                focus_lastname || nuevo.lastname
                  ? 'top-0.5 text-base text-xs text-blue-500'
                  : 'top-4 text-lg text-gray-500',
              ]"
              for="apellido"
            >
              Apellido
            </label>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:space-x-4 mt-4">
 

 

          <div class="relative w-1/2">
            <input
              v-model="nuevo.name"
              @focus="focus_username = true"
              @blur="focus_username = false"
              type="text"
              id="algo"
              placeholder=" "
              class="peer w-full h-14 px-6 rounded-md bg-neutral-800 text-white text-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              :class="[
                'absolute left-6 transition-all',
                focus_username || nuevo.username
                  ? 'top-0.5 text-base text-xs text-blue-500'
                  : 'top-4 text-lg text-gray-500',
              ]"
              for="algo"
            >
              Username
            </label>
          </div>

 
        </div>




        <div class="flex flex-col sm:flex-row sm:space-x-4 mt-4">
           

     
       
        </div>

 

 
        <hr />
        <div class="mt-4 relative w-full mt-1">
          <input
            autocomplete="new-email"
            v-model="nuevo.email"
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
              focus_mail || nuevo.email
                ? 'top-0.5 text-base text-xs text-blue-500'
                : 'top-4 text-lg text-gray-500',
            ]"
            for="mail"
          >
            Correo electronico
          </label>
        </div>

        <div class="relative w-full mt-1">
          <input
            autocomplete="new-password"
            v-model="nuevo.password"
            @focus="focus_password = true"
            @blur="focus_password = false"
            type="password"
            id="password"
            placeholder=" "
            required
            class="peer w-full h-14 px-6 rounded-md bg-neutral-800 text-white text-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label
            :class="[
              'absolute left-6 transition-all',
              focus_password || nuevo.password
                ? 'top-0.5 text-base text-xs text-blue-500'
                : 'top-4 text-lg text-gray-500',
            ]"
            for="password"
          >
            Ingrese una contrasena
          </label>
        </div>

        <div class="flex flex-col sm:flex-row sm:space-x-4 mt-4">
          <!-- Campo: Rol -->
          <div class="w-full sm:w-1/2">
 

          </div>
        </div>

        <div class="w-full flex justify-between mt-6">
          <router-link
            to="/"
            class="w-1/4 text-center text-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
          >
            Cancelar
          </router-link>

          <button
            type="submit"
            class="w-1/4 text-center text-green-400 border border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRegistroUsuario } from '@/composables/useRegistroUsuario'

const {
  nuevo,
  mensaje,
  error,
  focus_name,
  focus_lastname,
  focus_username,
  focus_mail,
  focus_password,
   crearUsuario,
} = useRegistroUsuario()
</script>
