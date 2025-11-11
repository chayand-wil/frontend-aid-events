import api from '../axios'

const API_URL = '/eventos/participants'

/**
 * Crea un participante para un evento
 * @param {Object} participantData { userId, eventId, role, status, registeredAt }
 * @returns {Promise<Object>} participant creado
 */
export const createParticipant = async (participantData) => {
	try {
		const response = await api.post(API_URL, participantData)
		return response.data
	} catch (error) {
		console.error('Error en createParticipant:', error)
		throw error
	}
}

export default {
	createParticipant,
}
