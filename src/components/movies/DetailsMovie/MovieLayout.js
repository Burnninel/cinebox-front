import { createMovieReviewSection } from "/src/components/movies/DetailsMovie/MovieReviews.js";
import { createMovieInfoSection } from "/src/components/movies/DetailsMovie/MovieInfo.js";
import { DOM } from "/src/helpers/dom/index.js";

export function MovieLayout({ movie, reviews }, currentUser) {
	const section = DOM.createDiv("movie-page");
	section.append(
		createMovieInfoSection(movie),
		createMovieReviewSection(reviews, currentUser, movie)
	);

	return section;
}
