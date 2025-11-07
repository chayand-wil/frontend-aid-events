<template>
 


  <!-- Contenedor principal centrado -->
<div class="max-w-4xl mx-auto px-4">

  <!-- Título -->
  <div class="mt-36 flex items-center justify-center">
    <h2 class="text-lg font-semibold mb-4 text-white">Mis Participaciones</h2>
  </div>

 


 





  </div>


 
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../axios";
import { reactive } from "vue";
import { computed } from "vue"; 
import PublicationCard from "@/components/PublicationCard.vue";

const router = useRouter();
   
  




</script>
