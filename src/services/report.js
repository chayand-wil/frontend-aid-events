// src/services/apiService.js
import api from '../axios'

const API_URL = '/reports'; //

export const fetchTotal = async (start_date, end_date) => {
  try {
    const response = await api.get(API_URL+'/total-sales',{
      params: {
        'start-date': start_date,
        'end-date': end_date
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArtists:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchTotalSales = async (start_date, end_date) => {
  try {
    const response = await api.get(API_URL+'/sales', {
      params: {
        'start-date': start_date,
        'end-date': end_date
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArtists:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};


export const fetchTopClients = async (limit) => {
  try {
    const response = await api.get(API_URL + '/top-clients', {
      params: {
        limit: limit
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArtists:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchArticlesSales = async () => {
  try {
    const response = await api.get(API_URL+'/articles-sales');
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArtists:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};

export const fetchArticlesRating = async (limit) => {
  try {
    const response = await api.get(API_URL+'/articles-rating',{
      params: {
        limit: limit
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error en fetchArtists:', error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};


