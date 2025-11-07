<template>
  <!-- Modal -->
  <InviteModal
    :show="showModal"
    @close="showModal = false"
    @action="handleAction"
  />

  <header
    class="w-full backdrop-blur-lg bg-white/10 text-white fixed top-0 z-50 border-b border-white/10"
  >
    <div
      class="flex items-center text-xl justify-between px-4 sm:px-6 lg:px-8 h-16"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-1 ml-4 sm:ml-8 lg:ml-16">
        <!-- <img src="" alt="Logo" class="w-6 h-6" /> -->
        <span class="text-lg font-bold">Bueno para mas nada</span>
      </div>

      <!-- Menú centrado -->
      <nav class="flex items-center space-x-6 relative z-50">
        <!-- Menú con dropdown -->
        <div class="relative" ref="dropdownRef">
          <button
            @click="openModal"
            class="flex flex-col items-center text-verdee text-sm hover:opacity-90 focus:outline-none"
          >
            Filtrar
          </button>

          <!-- Dropdown -->
          <div
            v-if="isOpen"
            class="absolute top-12 left-1/2 transform -translate-x-1/2 flex bg-gray-900 rounded-lg shadow-lg p-6 min-w-[300px] gap-12 z-50"
            ref="dropdownRef"
          >
            <!-- Columna 1 -->
            <div class="flex flex-col space-y-2">
              <span class="text-sm font-semibold text-gray-600">viniles</span>
              <a href="" class="text-green-600 hover:underline">Tecnología</a>
              <a href="#" class="text-green-600 hover:underline">Hogar</a>
              <a href="#" class="text-green-600 hover:underline">Moda</a>
              <a href="#" class="text-green-600 hover:underline"
                >Salud y Belleza</a
              >
              <a href="#" class="text-green-600 hover:underline">Deportes</a>
              <a href="#" class="text-green-600 hover:underline">Jardinería</a>
            </div>

            <!-- Columna 2 -->
            <div class="flex flex-col space-y-2">
              <span class="text-sm font-semibold text-gray-600">Cassets</span>
              <a href="#" class="text-green-600 hover:underline">Blog</a>
            </div>
            <div class="flex flex-col space-y-2">
              <span class="text-sm font-semibold text-gray-600">Cds</span>
              <a href="#" class="text-green-600 hover:underline">Blog</a>
              <a href="#" class="text-green-600 hover:underline">Guías</a>
              <a href="#" class="text-green-600 hover:underline">Webinars</a>
              <a href="#" class="text-green-600 hover:underline">Comunidad</a>
            </div>
          </div>
        </div>

        <button @click="openModal">home</button>
        <router-link to="/recicla0te.com/reutilizador/ranking"></router-link>

        <a href="#" class="flex flex-col items-center text-xm hover:opacity-90">
        </a>
      </nav>

      <!-- Apps y Usuario -->
      <div class="flex items-center space-x-4 mr-4 sm:mr-8 lg:mr-16">
     
<button
@click="openModal">
        Mi cuenta
</button>
<button
@click="openModal">
        Mi cuenta
</button>
        <!-- <button aria-label="Apps" class="hover:opacity-90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <circle cx="5" cy="5" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="12" cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
          </svg>
        </button> -->
        <!-- <Notifications /> -->
        <UserDropdown />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import UserDropdown from "../components/UserDropdown.vue";
// import Notifications from '../Notifications.vue'
import router from "@/router";
import InviteModal from "../components/InviteModal.vue";

const isOpen = ref(false);
const dropdownRef = ref(null);
const showModal = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

// Detectar clic fuera
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});



const cargarPublication = async (id) => {
  openModal()

}


// MODAL
function openModal() {
  showModal.value = true;
}

function handleAction(action) {
  if (action === 'login') {
    console.log('Ir a la pantalla de inicio de sesión');
    router.push('/login')
  } else if (action === 'register') {
    console.log('Ir a la pantalla de registro');
    router.push('/register')
  } else if (action === 'guest') {
    console.log('Continuar como invitado');
  }
}








</script>

<style scoped>
header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
