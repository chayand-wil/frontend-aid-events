import api from '../axios'

/**
 * Obtiene todos los tipos de promociones registrados
 * @returns La lista de tipos de promociones.
 */
export async function fetchPromotionTypes() {
    const res = await api.get('/promotion-type');
    return res.data?.data ?? [];
}

/**
 * Obtiene todas las promociones registradas
 * @returns La lista de promociones.
 */
export async function fetchPromotions() {
    const res = await api.get('/promotion');
    return res.data?.data ?? [];
}

/**
 * Registrar nueva promoción
 */
// body: { promotion_type_id, start_date (ISO), end_date (ISO) }
export async function createPromotion(payload) {
    const res = await api.post('/promotion', payload);
    return res.data; // asumo que devuelven el objeto creado con id
}

/**
 * Agrega un artículo a una promoción
 */
export async function addPromotionArticle(articleId, promotionId) {
    const res = await api.post('/promotion-articles', {
        article_id: articleId,
        promotion_id: promotionId,
    });
    return res.data;
}

/**
 * Obtiene el listado de géneros musicales
 * @returns La lista de generos, cada uno trae su listado de artículos
 */
export async function fetchMusicGenres() {
    const res = await api.get('/musicGenre');
    return res.data?.data ?? [];
}

// src/services/promotion.js
export async function fetchPromotionById(id) {
    const res = await api.get(`/promotion/${id}`);
    return res.data?.data ?? null;
}

