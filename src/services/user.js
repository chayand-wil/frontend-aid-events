import api from '../axios'

const API_URL = '/users/'; //
/**
 * Obtiene todos los usuarios.
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de usuarios.
 */
export const fetchUsers = async () => {
  try {
    const response = await api.get(API_URL+'all');
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchUsers:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

/**
 * Crea un nuevo usuario.
 * @param {Object} userData Los datos del usuario a crear.
 * @returns {Promise<Object>} Una promesa que resuelve con el usuario creado.
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error en createUser:', error);
    throw error;
  }
};

/**
 * Actualiza un usuario existente.
 * @param {number} id El ID del usuario.
 * @param {Object} userData Los datos del usuario a actualizar.
 * @returns {Promise<Object>} Una promesa que resuelve con el usuario actualizado.
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`${API_URL}${id}`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error en updateUser:', error);
    throw error;
  }
};

/**
 * Elimina un usuario.
 * @param {number} id El ID del usuario a eliminar.
 * @returns {Promise<Object>} Una promesa que resuelve con la respuesta de la API.
 */
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en deleteUser:', error);
    throw error;
  }
};
