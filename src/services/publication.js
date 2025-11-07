// src/services/apiService.js
import api from '../axios'

const API_URL = '/publication'; //
/**
 * Obtiene todos los artículos.
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de artículos.
 */
export const fetchPublications = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArticles:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

/**
 * Crea un nuevo artículo.
 * @param {Object} articleData Los datos del artículo a crear.
 * @returns {Promise<Object>} Una promesa que resuelve con el artículo creado.
 */
export const createPublication = async (formData) => {
  try {
    const response = await api.post(API_URL,formData);
    return response.data;
  } catch (error) {
    console.error('Error en createArticle:', error);
    throw error;
  }
};

/**
 * Actualiza un artículo existente.
 * @param {number} id El ID del artículo.
 * @param {Object} articleData Los datos del artículo a actualizar.
 * @returns {Promise<Object>} Una promesa que resuelve con el artículo actualizado.
 */
export const updatePublication = async (id, articleData) => {
  try {
    const response = await api.put(`${API_URL}${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error('Error en updateArticle:', error);
    throw error;
  }
};

/**
 * Elimina un artículo.
 * @param {number} id El ID del artículo a eliminar.
 * @returns {Promise<Object>} Una promesa que resuelve con la respuesta de la API.
 */
export const deletePublication = async (id) => {
  try {
    const response = await api.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteArticle:', error);
    throw error;
  }
};