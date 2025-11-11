<template>
  <div ref="menuRef" class="relative">
    <!-- Botón de apertura -->
    <button
      class="text-white text-2xl bg-transparent border-none cursor-pointer"
      @click.stop="toggle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="36"
        height="36"
      >
        <path
          d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"
        />
      </svg>
    </button>


    <!-- Menú desplegable -->
    <div
      v-if="open"
      class="absolute right-0 mt-6 w-64 rounded-xl bg-white/10 backdrop-blur-sm shadow-xl text-white p-4 z-50"
    >
      <template v-if="user.name">
        <p class="font-semibold text-green-400">{{ user.name }}</p>
        <p class="mb-4 text-sm text-gray-300">{{ user.email }}</p>

        <button
          @click="router.push('/admin/info_admin')"
          class="w-full text-green-400   py-2 rounded-md hover:bg-green-600 hover:text-white transition"
        >
          Mi Cuenta
        </button>
        <br>
        <br>
        <button
          @click="logout"
          class="w-full text-green-400 border border-green-400  py-2 rounded-md hover:bg-green-900 hover:text-white transition"
        >
          Cerrar sesión
        </button>
      </template>

      <template v-else>
        <p class="font-semibold text-red-400 mb-4">No has iniciado sesión</p>
        <button
          @click="router.push('/login')"
          class="w-full text-green-400 border border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
        >
          Iniciar sesión
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import api from '../axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuRef = ref(null)
const open = ref(false)


const user = ref({ id: null, name: '', email: '' })

const toggle = () => {
  open.value = !open.value
}

const handleClickOutside = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  try {
    // const res = await api.get('/users/profile')
    // console.log(res.data)
    // user.value = res.data
    user.value.name = localStorage.getItem('name')
    user.value.email = localStorage.getItem('email')



  } catch {
    router.push('/')
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const logout = async () => {
  try {
    // await api.post('/logout')
  } catch {}
  localStorage.clear()
  router.push('/user/home')
  window.location.href = '/'
}
</script>
