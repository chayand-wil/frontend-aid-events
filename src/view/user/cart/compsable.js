<template>
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-center">
      <h2 class="text-lg font-semibold mb-4 text-white">Completar la compra</h2>
    </div>

    
     <!-- boton pagar ahora -->
    <div class="flex items-center justify-center mb-6">
      <button
        @click="pagar_ahora(selectedOrder)"
        class="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        :disabled="isLoading || pendingOrders.length === 0"
      >
        <span v-if="isLoading">Procesando...</span>
        <span v-else>Pagar todo ahora</span>
      </button>
    </div>
    
 

    
    <div class="fixed top-20 right-40 z-50 space-y-4 w-[300px]">
      <!-- Mensaje de éxito -->
      <div
        v-if="successMessage"
        class="bg-white backdrop-blur-xs rounded-2xl p-10 shadow-lg text-xl text-verdee"
      >
        {{ successMessage }}
      </div>

      <!-- Mensaje de error de validación -->
      <div
        v-if="errorMessage"
        class="bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-lg text-xl text-red-600"
      >
        {{ errorMessage }}
      </div>
    </div>

 


    
<!-- Detalle de los articulos en el carrito -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:grid-cols-4 justify-items-center"
    >
      <div
        v-for="order in pendingOrders"
        :key="order.id"
        class="flex flex-col items-center"
      >
        <PublicationCard
          :publication="order"
          @cargar-Publication="cargarPublication"
          class="w-72"
        />
        <div class="mb-2 font-semibold text-white text-center">
          Orden# {{ order.id }} - Cantidad: {{ order.quantity }}
        </div>
 
        <div
          class="flex items-center justify-between border-2 border-gray-300 rounded-xl px-4 py-2 w-40"
        >
          <button @click="sumar_restarCantidad(order,1)" class="text-2xl">
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
          <button
          @click="eliminarArticulo(order)"
          > Eliminar</button>
          
          <button @click="sumar_restarCantidad(order, 2)" class="text-2xl">
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchOrdersUser, fetchUpdateOrder } from "@/services/order";
import { fetchOneArticle } from "@/services/article";
import PublicationCard from "@/components/PublicationCard.vue";

const router = useRouter();
const errorMessage = ref("");
const successMessage = ref("");
const orders = ref([]);
const isLoading = ref(false);

const user = ref(null);
const articles = ref([]);
  

const pagar_ahora = async (order) => {
  isLoading.value = true;
  try {

    //ciclo para pagar todas las ordenes pendientes
    for (const ord of pendingOrders.value) {
      const orderData = {
        id: ord.id,
        quantity: ord.quantity,
        state: "ready_to_shipped",
      };
      await fetchUpdateOrder(ord.id, orderData);
    }

    successMessage.value = res.data.message || "Pago realizado con exito!";
    setTimeout(() => {
      successMessage.value = "";
      router.push("/user/cart/my_articles");
    }, 3000);
  } catch (error) {
    errorMessage.value = error.res?.data || "Error al realizar el pago";
    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
    console.error("Error al actualizar la orden:", error);
    alert("Error al procesar el pago. Inténtalo de nuevo.");
  } finally {
    // Ocultar animación de carga
    isLoading.value = false;
  }
};
 
 
 





const eliminarArticulo = async (order) => {
  isLoading.value = true;
  try {
    const orderData = {
      id: order.id,
      quantity: 999,
      state: "completed",
    };
    console.log(orderData);
    const res = await fetchUpdateOrder(order.id, orderData);
    successMessage.value = res.data.message || "Se elimino ha eliminado del carrito";
    setTimeout(() => {
      successMessage.value = "";
      window.location.reload();
    }, 3000);
  } catch (error) {
    errorMessage.value = error.res?.data || "No se ha podido eliminar";
    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
    console.error("Error al eliminar del carrti:", error);
  }finally {
    // Ocultar animación de carga
    isLoading.value = false;
  }
};

const sumar_restarCantidad = async (order, accion) => {
    isLoading.value = true;
  const cantidad = ref(0); 

  if(accion == 1 ){
     cantidad.value = order.quantity + 1;
    
  }else{
     cantidad.value = order.quantity - 1;
  }

  try {
    const orderData = {
      id: order.id,
      quantity: cantidad.value,
      state: "pending_payment",
    };
    console.log(orderData);
    const res = await fetchUpdateOrder(order.id, orderData);
    successMessage.value = res.data.message || "Se resto un item al articulo";
    setTimeout(() => {
      successMessage.value = "";
      loadOrders();

      // window.location.reload();
    }, 3000);
  } catch (error) {
    errorMessage.value = error.res?.data || "No se ha podido restar";
    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
    console.error("Error al eliminar del carrti:", error);
  }finally {
    // Ocultar animación de carga
    isLoading.value = false;
  }
};

const loadOrders = async () => {
  isLoading.value = true;
  try {
    const response = await fetchOrdersUser(user.value);
    orders.value = response;

    const articlesData = await Promise.all(
      orders.value.map((order) => fetchOneArticle(order.publication_id))
    );

    articles.value = articlesData.map((res) => res.data);

    orders.value = orders.value.map((order, index) => {
      return {
        ...order,
        price: articles.value[index].price,
      };
    });

    console.log(orders.value);
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
  }
  finally {
    // Ocultar animación de carga
    isLoading.value = false;
  }
};

const cargarPublication = async (id) => {
  router.push({ name: "pub", params: { id } });
};

 
onMounted(async () => {
  user.value = parseInt(localStorage.getItem("id"), 10);
  await loadOrders();
});
</script>
