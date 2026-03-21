import { DOM } from "/src/helpers/dom/index.js";
import { IconStar, IconStarComplete } from "/src/assets/icons/icons.js";
import { setupRatingButton } from "/src/components/movies/DetailsMovie/MovieDetailHandler.js";

function createHeader(movie, currentUser) {
	const header = DOM.createHeader("movie-page__reviews-header");

	const title = DOM.createH1("movie-page__reviews-title", "Avaliações");

	const button = DOM.createButton({
		className: "movie-page__reviews-button",
		children: [
			DOM.createIcon(IconStar),
			DOM.createSpan("movie-page__reviews-button-text", "Avaliar filme"),
		],
		type: "submit",
	});

	header.append(title, button);

	setupRatingButton(button, movie, currentUser);

	return header;
}

function createProfile(username, isCurrentUser = false) {
	const profile = DOM.createDiv("movie-page__reviews-profile");
	const user = DOM.createDiv("movie-page__reviews-user");

	const avatar = DOM.createDiv("movie-page__reviews-avatar", [
		DOM.createIcon(IconStarComplete),
	]);

	const usernameDisplay = isCurrentUser
		? DOM.createDiv("movie-page__reviews-current-username", [
				DOM.createSpan("movie-page__reviews-username", username),
				DOM.createDiv("movie-page__reviews-label-you", [
					DOM.createSpan("movie-page__reviews-you-text", "você"),
				]),
		  ])
		: DOM.createSpan("movie-page__reviews-username", username);

	const userInfo = DOM.createDiv("movie-page__reviews-userinfo", [
		usernameDisplay,
		DOM.createSpan("movie-page__reviews-count", "18 filmes avaliados"),
	]);

	user.append(avatar, userInfo);

	profile.appendChild(user);

	return profile;
}

function createReviewBody(comment, rating) {
	const reviewsBody = DOM.createDiv("movie-page__reviews-body");

	const commentsCard = DOM.createParagraph(
		"movie-page__reviews-comment",
		comment
	);

	const ratingCard = DOM.createDiv("movie-page__reviews-rating", [
		DOM.createDiv("movie-page__reviews-rating-score", [
			DOM.createSpan("movie-page__reviews-rating-value", rating),
			DOM.createSpan("movie-page__reviews-rating-max", "/5"),
		]),
		DOM.createDiv("movie-page__reviews-rating-star", [
			DOM.createIcon(IconStarComplete),
		]),
	]);

	reviewsBody.append(commentsCard, ratingCard);

	return reviewsBody;
}

function createItemList(userReview, otherReviews) {
	const userReviewItem = userReview
		? [
				DOM.createLi("movie-page__reviews-item", [
					createProfile(userReview.usuario, true),
					createReviewBody(userReview.comentario, userReview.nota),
				]),
		  ]
		: [];

	const otherReviewItems = otherReviews.map((review) =>
		DOM.createLi("movie-page__reviews-item", [
			createProfile(review.usuario),
			createReviewBody(review.comentario, review.nota),
		])
	);

	return [...userReviewItem, ...otherReviewItems];
}

export function createMovieReviewSection(allReviews, currentUser, movie) {
	const reviewSection = DOM.createDiv("movie-page__reviews");

	const userReview = currentUser
		? allReviews.find((review) => review.usuario_id === currentUser.id)
		: null;

	const otherReviews = currentUser
		? allReviews.filter((review) => review.usuario_id !== currentUser.id)
		: allReviews;

	reviewSection.append(
		createHeader(movie, currentUser ),
		DOM.createUl(
			"movie-page__reviews-list",
			createItemList(userReview, otherReviews)
		)
	);

	return reviewSection;
}
