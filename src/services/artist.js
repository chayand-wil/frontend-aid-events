// src/services/apiService.js
import api from '../axios'

const API_URL = '/artist'; //
/**
 * Obtiene todos los artistas.
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de artistas.
 */
export const fetchArtists = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArtists:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

/**
 * Crea un nuevo artista.
 * @param {Object} artistData Los datos del artista a crear.
 * @returns {Promise<Object>} Una promesa que resuelve con el artista creado.
 */
export const createArtist = async (artistData) => {
  try {
    const response = await api.post(API_URL, artistData);
    return response.data;
  } catch (error) {
    console.error('Error en createArtist:', error);
    throw error;
  }
};

/**
 * Actualiza un artista existente.
 * @param {number} id El ID del artista.
 * @param {Object} artistData Los datos del artista a actualizar.
 * @returns {Promise<Object>} Una promesa que resuelve con el artista actualizado.
 */
export const updateArtist = async (id, artistData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, artistData);
    return response.data;
  } catch (error) {
    console.error('Error en updateArtist:', error);
    throw error;
  }
};

/**
 * Elimina un artista.
 * @param {number} id El ID del artista a eliminar.
 * @returns {Promise<Object>} Una promesa que resuelve con la respuesta de la API.
 */
export const deleteArtist = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteArtist:', error);
    throw error;
  }
};