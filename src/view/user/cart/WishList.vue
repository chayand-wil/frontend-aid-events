<template>
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-center">
      <h2 class="text-lg font-semibold mb-4 text-white">Lista de deseos</h2>
    </div>
 
 


  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from '../../../axios'
import PublicationCard from "@/components/PublicationCard.vue";
import { fetchOneArticle } from "@/services/article";
const router = useRouter();
const orders = ref([]);
const showInvoiceModal = ref(false);
const user = ref(null);
const articles = ref([]);

 
</script>
