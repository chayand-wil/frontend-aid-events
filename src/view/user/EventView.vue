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
    class="mt-4 w-full mt-40 max-w-[700px] mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-lg text-white"
  >
    <!-- Encabezado -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-semibold text-gray-900">
        {{ event?.nombre }}
      </h1>
      <p class="mb-2 text-lg font-bold text-blue-400">
        {{ event?.title }}
      </p>
    </div>

    <!-- Contenido principal -->
    <div class="flex flex-col lg:flex-row gap-4 w-full max-w-[1600px]">
      <!-- Imagen del producto -->
      <div class="flex-1 flex justify-center">
        <img
          :src="event?.publication?.image"
          alt="image del articulo"
          class="w-400 h-auto rounded-xl shadow"
        />
      </div>

      <!-- Información y opciones -->
      <div class="flex-1 space-y-6">
        <!-- Selector de tamaño -->

        <!-- si type == vinyl mostrar color -->
        <template v-if="event?.type === 'vinyl'">
          <label class="block text-xl font-medium text-gray-100 mb-1"
            >Vinyl:</label
          >
          <p
            class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-100"
          >
            Color {{ event?.color }}
          </p>
          <label class="block text-xl font-medium text-gray-100 mb-1"
            >Formato/duracion:</label
          >
          <p
            class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-100"
          >
            Capacidad: {{ event?.category }} Pulgadas
          </p>
        </template>

        <!-- si type == vinyl mostrar color -->
        <template v-if="event?.type === 'cassettes'">
          <label class="block text-xl font-medium text-gray-100 mb-1"
            >Cassette</label
          >
          <p
            class="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-100"
          >
            Estado: {{ event?.category }}
          </p>
        </template>

        <div>
          <p class="text-2xl text-gray-20">
            <span>Discografia: {{ event?.artist?.name }}</span>
          </p>
        </div>
        <!-- <div>
          <p class="text-xl text-gray-400">
            <strong>Genero:</strong> {{ event?.music_genre?.description }}
          </p>
        </div> -->
        <div>
          <p class="text-xl text-gray-400">
            <strong>Fecha</strong> {{ formatFecha(event?.start_date) }}
          </p>
        </div>

        <!-- Botones -->
        <div
          class="flex items-center justify-between border-2 border-gray-300 rounded-xl px-4 py-2 w-40"
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
          <span>Sin limite de asistencia</span>
        </div>

        <!-- Reproductor de audio -->
        <audio
          :src="event?.publication?.audio"
          controls
          class="w-full my-2"
        ></audio>

        <div class="flex flex-col gap-3">
          <button
            @click="asistentEvent"
            class="bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Asistir al evento
          </button>
        </div>

        <h2>Chat en Vivo</h2>

      <div class="relative w-full mt-1">
        <input
          v-model="username"
          @focus="focus_mail = true"
          @blur="focus_mail = false"
          type="text"
          id="mail"
          placeholder=" "
          required
          class="peer w-full h-14 px-6 rounded-md bg-neutral-800 text-white text-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label
          :class="[
            'absolute left-6 transition-all',
            focus_mail || newComment
              ? 'top-0.5 text-base text-xs text-blue-500'
              : 'top-4 text-lg text-gray-500',
          ]"
          for="mail"
        >
          Escribe un comentario
        </label>
      </div>
<button
@click="enviarComentario"
class="mt-2 w-full text-green-400 border border-green-400 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition"
> Enviar Comentario</button>


        
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../../axios";
import { fetchOneEvent } from "../../services/event";
import { comment } from "postcss";

// Props: si viene como tarjeta
const props = defineProps({
  publication: Object,
  //   user: Object,
});

const emit = defineEmits(["enviar-id"]);
const route = useRoute();
const publication = ref(props.publication ?? null);
const user = ref(props.user ?? null);
const event = ref();
const mensaje = ref("");
const error = ref("");
const cantidadComprar = ref(1);
const comments = ref([]);
const focus_mail = ref(false)
const newComment = ref('');



// const usuarioLogueado = inject('usuarioLogueado')
const show = ref(false);

const nuevaSolicitud = ref({
  id_estado_solicitud: null,
  id_publicacion: null,
  id_usuario_nuevo: null,
});

// "event_id":1,
// "app_user_id":1
const asistentEvent = async () => {
  user.value = parseInt(localStorage.getItem("id"), 10);

  const event_id = event.value.publication.id;
  console.log("event_id :", event_id);
  console.log("user: ", user.value);
  try {
    const response = await api.post("/userAttendance", {
      event_id: event.value.id,
      app_user_id: user.value,
    });
    console.log("Respuesta del servidor:", response.data);
    mensaje.value = "¡Te has inscrito al evento con éxito!";
    setTimeout(() => {
      mensaje.value = "";
    }, 3000);
  } catch (error) {
    mensaje.value = "¡Te has inscrito al evento con éxito!";

    setTimeout(() => {
      mensaje.value = "";
    }, 3000);
    console.error("Error al obtener los usuarios:", error);
  }
};

// Carga si no viene por prop
const loadEvent = async () => {
  try {
    const response = await fetchOneEvent(1);
    event.value = response;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
  try {
    const res1 = await api.get(`/comment/publication/${route.params.id}`);
    // const res1 = await api.get(`/comment/publication` + '/1');
    comments.value = res1.data.data;
    console.log(res1);
  } catch (error) {
    console.log(error);
  }
};
const enviarComentario = async () => {
  try {
    const response = await api.post('/login', {
      app_user_id: username.value,
      comment: newComment.value,
      publication_id: event.value.publication.id
    }) 
    
  } catch (error) {
    mensaje.value = "¡Comentario enviado con éxito!";
  }


};

onMounted(async () => {
  if (!publication.value) {
    try {
      await loadEvent();
    } catch (e) {
      console.error("Error cargando publicación:", e);
    }
  } else {
    // event.value = publication.value.event
  }
  //   console.log('Solicitudes:', publication.value)
  // Cargar catálogos
  if (publication.value) {
    // await cargarCatalogos()
    //pasar el id de la publicación al componente padre ( submenú)
    emit("enviar-id", publication.value.id);
  }
});

function formatFecha(fechaRaw) {
  if (!fechaRaw) return "Sin fecha";
  const fechaISO = fechaRaw.replace(" ", "T"); // Convierte a formato ISO
  const fecha = new Date(fechaISO);
  return isNaN(fecha) ? "Fecha no válida" : fecha.toLocaleString("es-ES");
}
</script>
