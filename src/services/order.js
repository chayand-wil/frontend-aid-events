// src/services/apiService.js
import api from '../axios'

const API_URL = '/order'; //
/**
 * Obtiene todos los pedidos.
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de pedidos.
 */
export const fetchOrdersUser = async (id) => {
  try {
    const response = await api.get(`/user/${id}` + '/orders');
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchOrdersUser:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchCreateOrder = async (id) => {
  try {
    const response = await api.post(API_URL, orderData);
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchCreateOrder:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};
export const fetchUpdateOrder = async (id, orderData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error en fetchUpdateOrder:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};
 




