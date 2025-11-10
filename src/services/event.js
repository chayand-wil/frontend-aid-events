import api from '../axios'

const API_URL = '/eventos'; //
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
 * Obtiene eventos relacionados a una alerta (catastropheId)
 * @param {string} catastropheId
 */
export const fetchEventsByAlert = async (catastropheId) => {
  try {
    // la API expuesta en el proyecto usa /api/eventos/alert/:id en el backend
    const response = await api.get(`${API_URL}/alert/${catastropheId}`);
    // intentamos devolver response.data.data si existe, si no devolvemos response.data
    return response.data.data ?? response.data;
  } catch (error) {
    console.error('Error en fetchEventsByAlert:', error);
    throw error;
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
    const response = await api.patch(`${API_URL}/${id}`, artistData);
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

/**
 * Crea un requerimiento para un evento
 * @param {Object} requirementData { eventId, requirementKey, requiredValue }
 */
export const createRequirement = async (requirementData) => {
  try {
    const response = await api.post(`${API_URL}/requirements`, requirementData);
    return response.data;
  } catch (error) {
    console.error('Error en createRequirement:', error);
    throw error;
  }
};