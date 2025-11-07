<template>
  <div class="homepage-viewport" :class="{ fadeIn: visible }">
    <div class="homepage-gradient-background" :class="theme"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)
const theme = ref('red') // Tema por defecto

onMounted(() => {
  visible.value = true
})
</script>

<style scoped>
.homepage-viewport {
  position: fixed;       /* fixed para que esté en todas las vistas */
  inset-inline-start: 0;
  inset-block-start: 0;
  inline-size: 100%;
  block-size: 100%;
  visibility: hidden;
  opacity: 0;
  z-index: -1;           /* detrás del contenido */
  transition: opacity 1s ease-in-out;
}

.homepage-viewport.fadeIn {
  opacity: 1;
  visibility: visible;
}

.homepage-gradient-background {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  inline-size: 100%;
  block-size: 100%;
  background-position: 50%;
  background-size: cover;
  background-image: url('@/assets/wallpaper.svg');
  opacity: 0;
  animation: homepage-gradient-background-fade-in 1s ease-in forwards;
}

.homepage-gradient-background.red:after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    58deg,
    #a83232,
    #5c1a1a 45%,
    #260000 90%
  );
  mix-blend-mode: multiply;
  opacity: 0.8;
}



.homepage-gradient-background.blue:after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(64deg, #5fc9f8, #00d440 45%, #2a8fff);
  mix-blend-mode: hard-light;
}

@keyframes homepage-gradient-background-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
