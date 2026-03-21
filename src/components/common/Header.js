import { DOM } from "/src/helpers/dom/index.js";
import { Element } from "/src/helpers/element/index.js";
import {
	IconLogo,
	IconPopcorn,
	IconMovie,
	IconUser,
} from "/src/assets/icons/icons.js";
import { navigateTo } from "/src/router.js";

const navButtonsConfig = [
	{ icon: IconPopcorn, label: "Explorar", form: "explorar" },
	{ icon: IconMovie, label: "Meus Filmes", form: "meus-filmes" },
];

function createButton({ icon, label, form }) {
	return DOM.createButton({
		className: "global-header__btn",
		attributes: { "data-form": form },
		children: icon
			? [
					DOM.createIcon(icon),
					DOM.createSpan("global-header__label", label),
			  ]
			: [DOM.createSpan("global-header__label", label)],
	});
}

function extractFirstName(currentUser) {
	const displayName = currentUser?.nome || currentUser?.name || "Usuário";
	return displayName.trim().split(" ")[0];
}

function createLoggedUserInfo(currentUser) {
	const firstName = extractFirstName(currentUser);

	const logoutButton = DOM.createButton({
		className: "global-header__logout-btn",
		textContent: "Sair",
	});

	logoutButton.addEventListener("click", () => {
		document.cookie = "token=; path=/; max-age=0";
		navigateTo("/login");
	});

	return DOM.createDiv("global-header__user", [
		DOM.createSpan("global-header__user-greeting", `Olá, ${firstName}`),
		DOM.createDiv("global-header__user-avatar", [DOM.createIcon(IconUser)]),
		logoutButton,
	]);
}

export function Header(currentUser = null) {
	const logo = DOM.createDiv("global-header__logo", [
		DOM.createIcon(IconLogo),
	]);

	logo.addEventListener("click", () => {
		navigateTo("/explorar");
	});

	const navButtons = navButtonsConfig.map(createButton);
	const loginButton = createButton({ label: "Entrar", form: "login" });

	const navbar = Element.createElement({
		tag: "nav",
		className: "global-header__navbar",
		children: navButtons,
	});

	const rightContent = currentUser
		? createLoggedUserInfo(currentUser)
		: DOM.createDiv("global-header__login", [loginButton]);

	const header = DOM.createHeader("global-header", [
		logo,
		navbar,
		rightContent,
	]);

	setupHeaderNavigation(
		currentUser ? navButtons : [...navButtons, loginButton],
	);

	return header;
}

function setupHeaderNavigation(buttons) {
	const setActiveButton = () => {
		const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
		buttons.forEach((btn) => {
			btn.classList.toggle(
				"global-header__btn--active",
				path.startsWith(btn.dataset.form)
			);
		});
	};

	buttons.forEach((btn) =>
		btn.addEventListener("click", () => {
			navigateTo(`/${btn.dataset.form}`);
			setActiveButton();
		})
	);

	setActiveButton();
}
