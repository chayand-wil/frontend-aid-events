import api from '../axios'

const API_URL = '/event'; //
/**
 * Obtiene un evento
 */
export const fetchOneEvent = async (id) => {
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchOneEvent:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchAllEvents = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data.data; // asumiendo que la API responde con { data: [...] }
  } catch (error) {
    console.error('Error en fetchAllEvents:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

/**
 * Crea un nuevo artista.
 * @param {Object} artistData Los datos del artista a crear.
 * @returns {Promise<Object>} Una promesa que resuelve con el artista creado.
 */
export const createEvents = async (artistData) => {
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
export const updateEvents = async (id, artistData) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, artistData);
    return response.data;
  } catch (error) {
    console.error('Error en updateArtist:', error);
    throw error;
  }
};

/**
 * Actualiza un artista existente.
 * @param {number} id El ID del artista.
 * @param {Object} artistData Los datos del artista a actualizar.
 * @returns {Promise<Object>} Una promesa que resuelve con el artista actualizado.
 */
export const deleteEvents = async (id) => {
  try {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en updateArtist:', error);
    throw error;
  }
};