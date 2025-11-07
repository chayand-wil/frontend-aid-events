<template>
  <!-- Tarjeta de publicación -->
  <div
    class="w-72 aspect-square bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg text-white flex-shrink-0"
  >
    <!-- Cabecera -->
    <div
      class="px-4 pt-4 flex justify-between items-center text-sm text-gray-400"
    >
      <!-- <span>{{ publication.quantity }}</span> -->
      <p>{{ publication?.artist?.name }}</p>
      <button @click="modalVisible = true">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="25"
          viewBox="0 0 1280.000000 1189.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <metadata>
            Created by potrace 1.15, written by Peter Selinger 2001-2017
          </metadata>
          <g
            transform="translate(0.000000,1189.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M3250 11884 c-25 -2 -106 -11 -180 -20 -1485 -172 -2704 -1295 -3001
-2764 -133 -660 -67 -1507 171 -2223 252 -753 675 -1411 1397 -2172 342 -360
634 -630 1588 -1470 231 -203 488 -430 570 -505 1024 -920 1735 -1692 2346
-2547 l130 -183 132 0 132 1 130 192 c557 822 1212 1560 2185 2461 191 178
408 373 1027 923 956 852 1445 1343 1841 1850 643 825 968 1603 1064 2553 19
196 17 665 -5 835 -105 805 -441 1497 -998 2054 -557 557 -1250 894 -2054 998
-193 24 -613 24 -810 0 -733 -93 -1379 -387 -1920 -874 -191 -172 -406 -417
-535 -610 -30 -45 -57 -82 -60 -82 -3 0 -30 37 -60 82 -129 193 -344 438 -535
610 -531 478 -1170 773 -1878 867 -146 20 -562 34 -677 24z"
            />
          </g>
        </svg>
      </button>
    </div>

    <!-- Descripción -->
    <div class="px-4 py-1 text-sm text-white">
      <p>{{ publication?.type }}</p>
    </div>

    <!-- Imagen con overlay -->
    <div @click.stop="emitirDetalle" class="relative w-full group">
      <img
        :src="publication?.publication?.image"
        alt="Publicación"
        class="w-full h-64 object-cover rounded cursor-pointer"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      ></div>
    </div>

    <!-- Estado -->
    <div class="mt-2 px-4 text-sm pb-1 text-green-400">
      <!-- Estado: {{ publication.article.estado_adquisicion.nombre }} -->
    </div>

    <!-- Acciones -->
    <div class="px-4 py-3 flex justify-between text-x border-t border-gray-700">
      <span>$ {{ publication?.price }}</span>

      <button class="flex items-center space-x-1 hover:text-purple-400">
        <template v-if="publication.quantity > 10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Disponible</span>
        </template>
        <template
          v-else-if="publication.quantity > 0 && publication.quantity <= 10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Pocas unidades</span>
        </template>
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Agotado</span>
        </template>
      </button>
    </div>
  </div>
  <AddwishListModal
    :show="modalVisible"
    :opciones="motivos"
    @close="modalVisible = false"
    @agregar-wishlist="setConfiguracion"
  />
</template>

<script setup>
import { ref } from "vue";
import AddwishListModal from "@/components/ModalWishList.vue";
const { publication } = defineProps(["publication", "motivos"]);

const modalVisible = ref(false);
const emit = defineEmits(["cargar-Publication", "agregar_wish"]);

const id_publicacion = ref(false);

function emitirDetalle() {
  emit("cargar-Publication", publication.publication.id);
}

function setConfiguracion() {
  modalVisible.value = false;
  emit("agregar_wish", publication.id);
}
</script>
