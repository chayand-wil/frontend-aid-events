<template>
    <div class="mt-4 mb-10  flex items-center justify-center ">

  <div
    class="mt-32 w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-white"
  >
    <!-- BARRA   categoriasss -->
    <div
      class="flex space-x-8 px-6 border-b-2 border-indigo-500 w-fit mx-auto text-sm font-semibold text-white"
    >
      <router-link
        :to="`/user/home/pub/${userId}/`"
        class="pb-2 hover:border-b-2 hover:border-white text-white text-2xl"
        >Evento</router-link
      >
      <router-link
        :to="`/user/home/pub/${userId}/info_user/`"
        class="pb-2 hover:border-b-2 hover:border-white text-white text-2xl"
        >Chat en vivo</router-link
      >
    </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  userId: {
    type: [String, Number],
    required: true,
  },
})

 
</script>
