<template>
  <div>
    <PublicationView />
    <SubMenu />
    <div>
      <router-view />
    </div>
  </div>
  
</template>

<script setup>
import SubMenu from '../components/cliente/AdminSubMenus.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PublicationView from  "../view/user/AlertView.vue";



const router = useRouter();
onMounted(async () => {
  // if(!localStorage.getItem('token')){
  //     window.location.href = '/'
 
  // }
});
</script>

 