<template>
  <header
    class="w-full backdrop-blur-lg bg-white/10 text-white fixed top-0 z-50 border-b border-white/10"
  >
    <nav
      ref="navRef"
      class="container mx-auto flex justify-between items-center   px-6 "
    >
      <!-- Logo que redirige al home -->
      <router-link
        to="/admin/home"
        class="flex items-center space-x-2 hover:opacity-80 transition"
      >
        <img
          src="../../assets/logo_bueno_para.png"
          alt="Logo"
          class="h-20 w-auto"
        />
        <span class="text-xl font-bold text-white">AID EVENTS</span>
      </router-link>

      <!-- Menú principal -->
      <ul class="flex space-x-6 items-center">
        <li
          class="relative"
          @mouseenter="openMenu('publicar')"
          @mouseleave="startCloseTimer"
        >
          <button
            class="hover:text-green-600 px-2 py-1"
            @click.prevent="toggleMenu('publicar')"
            :aria-expanded="activeMenu === 'publicar'"
          >
            Publicar contenido
          </button>

          <div
            v-show="activeMenu === 'publicar'"
            class="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 transition transform origin-top"
            @mouseenter="cancelCloseTimer"
            @mouseleave="startCloseTimer"
          >
          <a
              href="#"
              @click="router.push('/admin/publications')"
              class="block px-4 py-2 hover:bg-gray-100"
              >Publicaciones</a
            >
            <a
              href="#"
              @click="router.push('/admin/articles')"
              class="block px-4 py-2 hover:bg-gray-100"
              >Articulos</a
            >
            <a
              href="#"
              @click="router.push('/admin/artist')"
              class="block px-4 py-2 hover:bg-gray-100"
              >Artistas</a
            >
            <a
              href="#"
              @click="router.push('/admin/music-genre')"
              class="block px-4 py-2 hover:bg-gray-100"
              >Genero Musical</a
            >
            <a
              href="#"
              @click="router.push('/admin/promotions')"
              class="block px-4 py-2 hover:bg-gray-100"
              >Promocion</a
            >
            <a
              href="#"
              @click="router.push('/admin/events')"
              class="block px-4 py-2 hover:bg-gray-100"
              >Evento</a
            >
          </div>
        </li>
        <li
          class="relative"
          @mouseenter="openMenu('administrar')"
          @mouseleave="startCloseTimer"
        >
          <button
            class="hover:text-green-600 px-2 py-1"
            @click.prevent="toggleMenu('administrar')"
            :aria-expanded="activeMenu === 'administrar'"
          >
            Administracion
          </button>

          <div
            v-show="activeMenu === 'administrar'"
            class="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 transition transform origin-top"
            @mouseenter="cancelCloseTimer"
            @mouseleave="startCloseTimer"
          >
            <a
              href="#"
              @click="router.push('/admin/users')"
              class="block px-4 py-2 hover:bg-gray-100"
              >usuarios</a
            >

            <a
              href="#"
              @click="router.push('/admin/publications-list')"
              class="block px-4 py-2 hover:bg-gray-100"
              >Moderacion</a
            >

            <a
              href="#"
              @click="router.push('/admin/reports')"
              class="block px-4 py-2 hover:bg-gray-100"
              >Reportes</a
            >
            <a
              href="#"
              @click="closeMenu"
              class="block px-4 py-2 hover:bg-gray-100"
              >otro</a
            >
          </div>
        </li>

        <UserDropdown />
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import UserDropdown from "../admin/AdminDropdown.vue";

// import

const router = useRouter();

const isOpen = ref(false);
const dropdownRef = ref(null);
const showModal = ref(false);
// +++++++++++++++++++++++++++++++++++++++
const activeMenu = ref(null);
let closeTimeout = null;
const navRef = ref(null);

/* Abrir menú (y cancelar cualquier temporizador) */
function openMenu(menu) {
  clearTimeout(closeTimeout);
  activeMenu.value = menu;
}

/* Iniciar temporizador para cerrar (pequeño retardo para permitir el movimiento del cursor) */
function startCloseTimer() {
  clearTimeout(closeTimeout);
  closeTimeout = setTimeout(() => {
    activeMenu.value = null;
    closeTimeout = null;
  }, 150); // <-- ajusta el retardo si lo deseas (ej. 200-300 ms)
}

/* Cancelar el temporizador (cuando el cursor entra al dropdown) */
function cancelCloseTimer() {
  if (closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
}

/* Cerrar inmediatamente */
function closeMenu() {
  clearTimeout(closeTimeout);
  activeMenu.value = null;
}

/* Toggle para click (útil en móviles) */
function toggleMenu(menu) {
  if (activeMenu.value === menu) closeMenu();
  else openMenu(menu);
}

/* Cerrar al hacer click fuera del nav */
function onDocClick(e) {
  if (navRef.value && !navRef.value.contains(e.target)) {
    closeMenu();
  }
}

onMounted(() => {
  document.addEventListener("click", onDocClick);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick);
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// MODAL
function openModal() {
  showModal.value = true;
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

// Detectar clic fuera
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
}
</script>
