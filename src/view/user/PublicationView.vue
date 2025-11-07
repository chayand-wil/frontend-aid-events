<template>
  <!-- Contenedor flotante MENSAJES -->
  <div class="fixed top-20 right-40 z-50 space-y-4 w-[300px]">
    <!-- Mensaje de éxito -->
    <div
      v-if="mensaje"
      class="bg-white/20 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-verdee"
    >
      {{ mensaje }}
    </div>

    <!-- Mensaje de error de validación -->
    <div
      v-if="error"
      class="bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-red-600"
    >
      {{ error }}
    </div>
  </div>

  <!-- MODAL LADO -->

  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
  >
    <!-- Contenedor del modal -->
    <div
      class="bg-black border-2 border-gray-300 rounded-3xl p-8 text-white relative"
    >
      <!-- Contenido del modal -->
      <div class="flex space-x-16 mb-6">
        <!-- Lado A -->
        <div>
          <p class="mb-2">Lado A:</p>
          <ul class="space-y-1">
            <li>Chayand</li>
            <li>Vicente</li>
            <li>Luis Miguel</li>
          </ul>
        </div>

        <!-- Lado B -->
        <div>
          <p class="mb-2">Lado B:</p>
          <ul class="space-y-1">
            <li>Chayand</li>
            <li>Vicente</li>
            <li>Luis Miguel</li>
          </ul>
        </div>
      </div>

      <!-- Botón cerrar centrado abajo -->
      <div class="text-center">
        <button
          @click="show = false"
          class="px-4 py-2 text-white rounded-lg hover:bg-gray-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>

  <!-- UNA PUBLICACION - DETALLE -->
  <div
    class="mt-24 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white"
  >
    <!-- Encabezado -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-semibold text-gray-900">
        {{ article?.nombre }}
      </h1>
      <p class="text-lg text-white mb-2">
        Discografia: {{ article?.artist?.name }}
      </p>
    </div>

    <p>Anio de publicacion: {{ article?.publication_year }}</p>

    <!-- Contenido principal -->
    <div class="flex mt-4 flex-col lg:flex-row gap-4 w-full max-w-[1600px]">
      <!-- Imagen del producto -->
      <div class="flex-1 flex justify-center">
        <img
          :src="publication?.image"
          alt="image del articulo"
          class="w-400 h-auto rounded-xl shadow"
        />
      </div>

      <!-- Información y opciones -->
      <div class="flex-1 space-y-6">
        <!-- Selector de tamaño -->

        <!-- si type == vinyl mostrar color -->
        <template v-if="article?.type === 'vinyl'">
          <label class="block text-xl font-medium text-gray-100 mb-1"
            >Vinyl:</label
          >
          <p
            class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-100"
          >
            Color {{ article?.color }}
          </p>
          <label class="block text-xl font-medium text-gray-100 mb-1"
            >Formato/duracion:</label
          >
          <p
            class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-100"
          >
            Capacidad: {{ article?.category }} Pulgadas
          </p>
        </template>

        <!-- si type == vinyl mostrar color -->
        <template v-if="article?.type === 'cassettes'">
          <label class="block text-xl font-medium text-gray-100 mb-1"
            >Cassette</label
          >
          <p
            class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-100"
          >
            Estado: {{ article?.category }}
          </p>
        </template>

        <!-- Entrega -->
        <div>
          <p class="text-xl text-gray-400">
            <strong>Genero:</strong> {{ article?.music_genre?.description }}
          </p>
        </div>

        <button
          @click="show = true"
          class="px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Ver lista de canciones
        </button>

        <!-- Recoger -->
        <template v-if="article?.quantity > 10">
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
          <span>Disponible: {{ article?.quantity }} unidades</span>
        </template>
        <template v-else-if="article?.quantity > 0 && article?.quantity <= 10">
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
          <span>Pocas unidades: {{ article?.quantity }}</span>
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

        <div>
          <p class="text-2xl text-gray-20">
            <span class="underline">Precio: $ {{ article?.price }}</span>
          </p>
        </div>

        <!-- Botones -->
        <div
          class="flex items-center justify-between border-2 border-gray-300 rounded-xl px-4 py-2 w-40"
        >
          <button @click="sumarCantidad" class="text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <span class="text-lg font-bold">{{ cantidadComprar }}</span>
          <button @click="restarCantidad" class="text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>
        <button
          @click="router.push('/user/cart')"
          class="px-4 py-2 bg-gray-400 text-white rounded-lg"
        >
          Ir al carrito
        </button>
        <div class="flex flex-col gap-3">
          <button
            @click="solicitarArticulo"
            class="bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Agregar al carrito
          </button>
          <button
            class="bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
          >
            Agregar la lista de deseos
          </button>
        </div>
      </div>
    </div>
    <br />
    <p class="text-sm text-white">
      Dimensiones del artículo: Ancho {{ article?.dimension_x }}, Alto
      {{ article?.dimension_y }}
    </p>
  </div>

  <div
    class="mt-24 w-full max-w-[900px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white"
  >
    <CommentPublications
      v-for="item in comments"
      :key="item.id"
      :commentation="item"
      class="w-72 flex-shrink-0"
    />
  </div>
</template>
<script setup>
import { inject } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import api from "../../axios";

// Props: si viene como tarjeta
const props = defineProps({
  publication: Object,
  //   user: Object,
});

const emit = defineEmits(["enviar-id"]);
const router = useRouter();
const route = useRoute();
const publication = ref(props.publication ?? null);
const user = ref(null);
const article = ref();
const mensaje = ref("");
const error = ref("");
const cantidadComprar = ref(1);
const comments = ref([]);

// const usuarioLogueado = inject('usuarioLogueado')
const show = ref(false);

const newOrder = ref({
  publication_id: null,
  app_user_id: null,
  quantity: null,
  state: null,
});

// Carga si no viene por prop
const cargarInfo = async () => {
  try {
    const res = await api.get(`/article/${route.params.id}`);
    publication.value = res.data.data.publication;
    article.value = res.data.data;
    console.log(res);
  } catch (e) {
    console.error("Error cargando información de los comentarios>>>: ", e);
  }
  try {
    const res1 = await api.get(`/comment/publication/${route.params.id}`);
    comments.value = res1.data.data;
    console.log(res1);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  if (!publication.value) {
    try {
      user.value = parseInt(localStorage.getItem("id"), 10);
      await cargarInfo();
    } catch (e) {
      console.error("Error cargando publicación:", e);
    }
  } else {
    // article.value = publication.value.article
  }
  if (publication.value) {
    emit("enviar-id", publication.value.id);
  }
});

function formatFecha(fechaRaw) {
  if (!fechaRaw) return "Sin fecha";
  const fechaISO = fechaRaw.replace(" ", "T"); // Convierte a formato ISO
  const fecha = new Date(fechaISO);
  return isNaN(fecha) ? "Fecha no válida" : fecha.toLocaleString("es-ES");
}

//create order
const solicitarArticulo = async () => {
  if (!user.value) {
    window.location.href = "/user/home"; // Redirige a la página de inicio de sesión
  }
  newOrder.value.publication_id = publication.value.id;
  newOrder.value.app_user_id = user.value;
  newOrder.value.quantity = cantidadComprar.value;
  newOrder.value.state = "pending_payment";
  console.log(newOrder.value);
  try {
    const res = await api.post("/order", newOrder.value);
    mensaje.value = res?.data?.message || "Artículo agregado al carrito";
    setTimeout(() => {
      mensaje.value = "";
    }, 3000);
    // console.log("Orden creada:", res.data)
  } catch (error) {
    error.value =
      error?.response?.data?.message || "Error al crear la orden W.";
    console.error("Error creando la orden:", error);
    setTimeout(() => {
      mensaje.value = "";
    }, 3000);
  }
};

//funcion de sumar y restar a la cantidad de productos en el carrito
const sumarCantidad = () => {
  if (article.value && cantidadComprar.value < article.value.quantity) {
    cantidadComprar.value++;
  }
};

const restarCantidad = () => {
  if (cantidadComprar.value > 1) {
    cantidadComprar.value--;
  }
};
</script>
