<template>
  <div>
    <SubMenu />
    <div>
      <router-view />
    </div>
  </div>
  
</template>

<script setup>
import SubMenu from '../../components/cliente/CartSubMenus.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(async () => {
  if(!localStorage.getItem('token')){
      window.location.href = '/'
 
  }
});
</script>

 