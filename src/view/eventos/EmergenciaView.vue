<template>

<div>
    <h1>Donacion de insumos </h1>
    <h1>Voluntariado</h1>
</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
    
async function algo() {
    const id = route.params.id;
}

onMounted(() => {
    algo();
});

</script>