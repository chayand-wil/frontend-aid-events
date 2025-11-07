import api from '../axios'

const API_URL = '/publication-type'; //

export const fetchPublicationTypes = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArticles:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};