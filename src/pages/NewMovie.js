import { Header } from "/src/components/common/Header.js";
import { AddMovie } from "/src/components/movies/AddMovie/AddMovie.js";

export async function NewMovie(currentUser) {
	const fragment = document.createDocumentFragment();

	fragment.appendChild(Header(currentUser));

	const section = await AddMovie(currentUser?.token);
	fragment.appendChild(section);

	return fragment;
}
