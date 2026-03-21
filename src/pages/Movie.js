import { Header } from "/src/components/common/Header.js";
import { MovieLayout } from "/src/components/movies/DetailsMovie/MovieLayout.js";
import { fetchMovieById } from "/src/services/movieService.js";

export async function Movie(currentUser, params) {
	const fragment = document.createDocumentFragment();

	const header = Header(currentUser);
	fragment.appendChild(header);

	const getMovie = await fetchMovieById(params.id);
	const data = getMovie.data;

	const layout = MovieLayout({
		movie: data.filme,
		reviews: data.avaliacoes,
	}, currentUser);

	fragment.appendChild(layout);

	return fragment;
}
