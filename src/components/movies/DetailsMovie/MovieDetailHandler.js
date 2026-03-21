import { navigateTo } from "/src/router.js";
import { createModalRating } from "/src/components/movies/DetailsMovie/MovieDetailRating.js";
import { handlePublishRating } from "/src/services/movieService.js";
import { showLoading, hideLoading } from "/src/components/common/Loading.js";

export function setupBackButton(wrapper) {
	const button = wrapper.querySelector("button");
	if (button) {
		button.addEventListener("click", () => {
			navigateTo("/explorar");
		});
	}
}

export function setupRatingButton(wrapper, movie, currentUser) {
	wrapper.addEventListener("click", () => {
		const modal = createModalRating(movie, currentUser);
		modal.show();
	});
}

export async function publishRating(payload, movieId, currentUser) {
	const token = currentUser?.token;

	showLoading();
	try {
		const response = await handlePublishRating(
			`avaliacao/${movieId}`,
			payload,
			token,
		);
		return response?.message;
	} catch (error) {
		throw error;
	} finally {
		hideLoading();
	}
}
