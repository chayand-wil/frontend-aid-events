// src/services/apiService.js
import api from '../axios'

const API_URL = '/article'; //
/**
 * Obtiene todos los artículos.
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de artículos.
 */
export const fetchArticles = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArticles:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};
export const fetchOneArticle = async (id) => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en fetchOneArticle:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

/**
 * Crea un nuevo artículo.
 * @param {Object} articleData Los datos del artículo a crear.
 * @returns {Promise<Object>} Una promesa que resuelve con el artículo creado.
 */
export const createArticle = async (articleData) => {
  try {
    const response = await api.post(API_URL, articleData);
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
export const updateArticle = async (id, articleData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, articleData);
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
export const deleteArticle = async (id) => {
  try {
    const response = await api.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteArticle:', error);
    throw error;
  }
};

