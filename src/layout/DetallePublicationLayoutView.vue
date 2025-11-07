<template>
  <div>
    <SubMenu :userId="userId" />
    <!-- <SubMenu  /> -->
    <div>
      <router-view @enviar-id="handleUserId" />
      <!-- <router-view /> -->
    </div>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'
import SubMenu from '@/components/SubMenusPubs.vue'

const userId = ref(null)

function handleUserId(id) {
  userId.value = id
}
</script>
 