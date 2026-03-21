import { apiRequest } from "/src/helpers/apiHelpers.js";
import { validateForm } from "/src/utils/validateForm.js";

const API_URL = "http://localhost:8888/filme";
const API_URL_avaliacao = "http://localhost:8888";

export async function handleMovieRequest(endpoint, payload, token) {
	return apiRequest(`${API_URL}/${endpoint}`, "POST", payload, token);
}

export function fetchAllMovies(pesquisar = null) {
	if (pesquisar) {
		return apiRequest(`${API_URL}?pesquisar=${pesquisar}`, "GET");
	}

	return apiRequest(API_URL, "GET");
}

export async function fetchMovieById(id) {
	return apiRequest(`${API_URL}/${id}`, "GET");
}

export async function fetchMoviesByUser(token) {
	return apiRequest(`${API_URL}/meus-filmes`, "GET", null, token);
}

export async function validateNewMovie(formData) {
	const validationRules = {
		titulo: { required: true, minLength: 3 },
		diretor: { required: true, minLength: 6 },
		ano_de_lancamento: {
			required: true,
			numeric: true,
			length: 4,
			between: [1900, 2025],
		},
		categoria: { required: true, minLength: 3 },
		sinopse: { required: true, minLength: 10 },
	};

	return validateForm(formData, validationRules);
}

export async function toggleMovieFavorite(id, action) {
	return apiRequest(`${API_URL}/${id}/${action}`, "POST");
}

export async function handlePublishRating(endpoint, payload, token) {
	return apiRequest(`${API_URL_avaliacao}/${endpoint}`, "POST", payload, token);
}