 <!-- <template>
  <RouterView />
</template>
  -->



 
<template>
  <IcloudBackground />
  <router-view />
</template>

<script setup>
import IcloudBackground from '@/components/IcloudBackground.vue'
</script>

<style>
/* Asegúrate que el contenido principal esté encima del fondo */
router-view {
  position: relative;
  z-index: 0;
}
</style>
