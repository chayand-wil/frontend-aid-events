<template>
  <div class="layout">
    <AppHeader />
    <div class="main">
      <!-- <AppSidebar /> -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from "../../components/cliente/UserAppHeader.vue";
// import AppSidebar from '../components/reutilizador/AppSidebar.vue'

import { provide, ref, onMounted } from "vue";
import api from "../../axios";
import { useRouter } from "vue-router";

// Usuario ref for passing to PublicationView
const usuario = ref(null);
const router = useRouter();

onMounted(async () => {
  try {
    //   usuario.value = res.data
    //   const res2 = await api.get(`/get_notifications/${usuario.value.id}`)
  } catch (e) {
    // router.push('/')
  }
});

// provide('usuarioLogueado', usuario)
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%; /* no uses 100vw */
  overflow: hidden;
}

.main {
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;
  min-width: 0;
}

.content {
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: white;
}
</style>
