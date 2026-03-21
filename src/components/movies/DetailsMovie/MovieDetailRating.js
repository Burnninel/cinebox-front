import { DOM } from "/src/helpers/dom/index.js";
import { Modal } from "bootstrap";
import { publishRating } from "/src/components/movies/DetailsMovie/MovieDetailHandler.js";
import { ToastContainer } from "/src/components/common/ToastContainer.js";
import { IconStar, IconStarComplete } from "/src/assets/icons/icons.js";

function createDetailItem(label, value) {
	return DOM.createLi("rating-modal__info-item", [
		DOM.createSpan("rating-modal__info-label", `${label}: `),
		DOM.createSpan("rating-modal__info-value", value),
	]);
}

function renderImage(path) {
	return DOM.createImage("rating-modal__image", path);
}

function createRatingStarsInput() {
	const stars = Array.from({ length: 5 }, (_, index) =>
		DOM.createLi("movie-page__rating-item", [
			DOM.createButton({
				className: "rating-modal__star-button",
				type: "button",
				attributes: {
					"aria-label": `Nota ${index + 1}`,
				},
				children: [
					DOM.createDiv("rating-modal__star-outline", [
						DOM.createIcon(IconStar),
					]),
					DOM.createDiv("rating-modal__star-filled", [
						DOM.createIcon(IconStarComplete),
					]),
				],
			}),
		]),
	);

	return DOM.createDiv("rating-modal__user-rating", [
		DOM.createSpan("rating-modal__user-rating-label", "Sua avaliação:"),
		DOM.createUl("movie-page__rating-stars rating-modal__stars", stars),
	]);
}

export function createModalRating(movie, currentUser) {
	let modalEl = document.getElementById("ratingModal");

	const infoFields = [
		{ label: "Diretor", value: movie.diretor },
		{ label: "Categoria", value: movie.categoria },
		{ label: "Ano", value: movie.ano_de_lancamento },
	];

	const detailsItems = [
		DOM.createH1("rating-modal__title", movie.titulo),
		DOM.createUl("rating-modal__details-list", [
			...infoFields.map((item) =>
				createDetailItem(item.label, item.value),
			),
		]),
		createRatingStarsInput(),
	];

	if (!modalEl) {
		modalEl = DOM.createDiv(
			"modal fade",
			[
				DOM.createDiv("modal-dialog", [
					DOM.createDiv("modal-content", [
						DOM.createDiv("modal-header", [
							DOM.createH2(
								"rating-modal__label",
								"Avaliar filme",
							),
							DOM.createButton({
								className: "btn-close",
								type: "button",
								attributes: {
									"data-bs-dismiss": "modal",
									"aria-label": "Close",
								},
							}),
						]),
						DOM.createDiv("modal-body", [
							DOM.createDiv("rating-modal__info", [
								DOM.createDiv("rating-modal__info-image", [
									renderImage(movie.imagem),
								]),
								DOM.createDiv(
									"rating-modal__details-content",
									detailsItems,
								),
							]),
							DOM.createTextarea("rating-modal__textarea", {
								placeholder: "Comentário",
							}),
						]),

						DOM.createDiv("modal-footer", [
							DOM.createButton({
								className: "rating-modal__cancel",
								textContent: "Cancelar",
							}),
							DOM.createButton({
								className: "rating-modal__submit",
								textContent: "Publicar",
							}),
						]),
					]),
				]),
			],
			{ id: "ratingModal", tabindex: "-1" },
		);

		document.body.appendChild(modalEl);
	}

	const bsModal = new Modal(modalEl);

	const commentInput = modalEl.querySelector(".rating-modal__textarea");
	const submitButton = modalEl.querySelector(".rating-modal__submit");

	let starsSelected = 0;

	const items = [
		...modalEl.querySelectorAll(
			".rating-modal__stars .movie-page__rating-item",
		),
	];

	items.forEach((item, index) => {
		item.onclick = () => {
			starsSelected = index + 1;

			items.forEach((starItem, starIndex) => {
				starItem.classList.toggle("is-selected", starIndex <= index);
			});
		};
	});

	const toastContainer = ToastContainer();

	submitButton.onclick = async () => {
		const payload = {
			nota: starsSelected,
			comentario: commentInput.value.trim(),
		};

		try {
			const successMessage = await publishRating(
				payload,
				movie.id,
				currentUser,
			);
			toastContainer.showToast({
				message: successMessage,
				type: "success",
			});
			bsModal.hide();
		} catch (error) {
			toastContainer.showToast({
				message: error.message,
				type: "error",
			});
		}
	};

	return {
		show: () => bsModal.show(),
		hide: () => bsModal.hide(),
		modalEl,
	};
}
