// src/services/apiService.js
import api from '../axios'

const API_URL = '/comment'; //
/**
 * Obtiene los comentarios de un evento
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de artistas.
 */
export const fetchComments = async (id) => {
  try {
    const response = await api.get(`${API_URL}/publication/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArtists:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

/**
 * banea un comentario
 */
export const banComment = async (id) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, {"id":1, "comment_status":"ban"});
    return response.data.data;
  } catch (error) {
    console.error('Error en banComment:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};