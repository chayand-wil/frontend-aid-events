<template>
  <div>
    <PublicationView :publication="publicationFromState" />
    <SubMenu />
    <div>
      <router-view />
    </div>
  </div>
  
</template>

<script setup>
import SubMenu from '../components/cliente/SubMenus.vue'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PublicationView from  "../view/user/AlertView.vue";


const router = useRouter();
const route = useRoute();
const publicationFromState = ref(null);

onMounted(async () => {
  // Try to read publication from history.state (router.push state) first
  try {
    const st = window.history.state && window.history.state.publication;
    if (st) {
      publicationFromState.value = st;
      return;
    }
  } catch (e) {
    console.warn('No history.state publication', e);
  }

  // Fallback: try sessionStorage (previous implementation)
  try {
    const raw = sessionStorage.getItem('selectedAlert');
    if (raw) {
      publicationFromState.value = JSON.parse(raw);
    }
  } catch (e) {
    // ignore
  }
});
</script>

 