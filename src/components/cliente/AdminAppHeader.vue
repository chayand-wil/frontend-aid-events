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
    <nav
      ref="navRef"
      class="container mx-auto flex justify-between items-center px-6"
    >
      <router-link
        to="/admin"
        class="flex items-center space-x-2 hover:opacity-80 transition"
      >
        <img
          src="../../assets/logo_bueno_para.png"
          alt="Logo"
          class="h-20 w-auto"
        />
        <span class="text-xl font-bold text-white">AID EVENTS - GESTION</span>
      </router-link>

      <!-- Menú centrado -->
      <nav class="flex items-center space-x-6 relative z-50">
        <router-link
          to="/user/home"
          class="flex items-center space-x-2 hover:opacity-80 transition"
        >
          <svg class="w-9 h-9 fill-white" viewBox="0 0 24 24">
            <path
              d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732z"
            ></path>
          </svg>
        </router-link>
        <router-link
          to="/user/cart"
          class="flex items-center space-x-2 hover:opacity-80 transition"
        >
          <svg
            class="w-9 h-9 fill-white"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 510 510"
            style="enable-background: new 0 0 510 510"
            xml:space="preserve"
          >
            <g>
              <g id="shopping-cart">
                <path
                  d="M153,408c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S181.05,408,153,408z M0,0v51h51l91.8,193.8L107.1,306
			c-2.55,7.65-5.1,17.85-5.1,25.5c0,28.05,22.95,51,51,51h306v-51H163.2c-2.55,0-5.1-2.55-5.1-5.1v-2.551l22.95-43.35h188.7
			c20.4,0,35.7-10.2,43.35-25.5L504.9,89.25c5.1-5.1,5.1-7.65,5.1-12.75c0-15.3-10.2-25.5-25.5-25.5H107.1L84.15,0H0z M408,408
			c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S436.05,408,408,408z"
                />
              </g>
            </g>
          </svg>
        </router-link>

        <router-link
          to="/user/search"
          class="flex items-center space-x-2 hover:opacity-80 transition"
        >
          <svg
            class="w-9 h-9 fill-white"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 612.08 612.08"
            style="enable-background: new 0 0 612.08 612.08"
            xml:space="preserve"
          >
            <g>
              <path
                d="M237.927,0C106.555,0,0.035,106.52,0.035,237.893c0,131.373,106.52,237.893,237.893,237.893
		c50.518,0,97.368-15.757,135.879-42.597l0.028-0.028l176.432,176.433c3.274,3.274,8.48,3.358,11.839,0l47.551-47.551
		c3.274-3.274,3.106-8.703-0.028-11.838L433.223,373.8c26.84-38.539,42.597-85.39,42.597-135.907C475.82,106.52,369.3,0,237.927,0z
		 M237.927,419.811c-100.475,0-181.918-81.443-181.918-181.918S137.453,55.975,237.927,55.975s181.918,81.443,181.918,181.918
		S338.402,419.811,237.927,419.811z"
              />
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </router-link>

        <a href="#" class="flex flex-col items-center text-xm hover:opacity-90">
        </a>
      </nav>

      <!-- Apps y Usuario -->
      <div class="flex items-center space-x-4 mr-4 sm:mr-8 lg:mr-16">
        <!-- <router-link
          to="/user/home"
          class="flex items-center space-x-2 hover:opacity-80 transition"
        >
          <svg
            class="w-9 h-9 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path
              d="M256,480a80.09,80.09,0,0,0,73.3-48H182.7A80.09,80.09,0,0,0,256,480Z"
            />
            <path
              d="M400,288V227.47C400,157,372.64,95.61,304,80l-8-48H216l-8,48c-68.88,15.61-96,76.76-96,147.47V288L64,352v48H448V352Z"
            />
          </svg>
        </router-link> -->
        <Notifications />
        <UserDropdown />
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import UserDropdown from "../../components/UserDropdown.vue";
import Notifications from "../Notifications.vue";
import InviteModal from "../../components/InviteModal.vue";
import router from "@/router";

const isOpen = ref(false);
const dropdownRef = ref(null);
const showModal = ref(false);
const isLoggedIn = ref(false);

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      showModal.value = false;
    } else {
      openModal();
    }
  } catch (error) {
    console.log(error);
  }
});

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
  openModal();
};

// MODAL
function openModal() {
  showModal.value = true;
}

function handleAction(action) {
  if (action === "login") {
    console.log("Ir a la pantalla de inicio de sesión");
    router.push("/login");
  } else if (action === "register") {
    console.log("Ir a la pantalla de registro");
    router.push("/register");
  } else if (action === "guest") {
    console.log("Continuar como invitado");
  }
}
</script>

<style scoped>
header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
