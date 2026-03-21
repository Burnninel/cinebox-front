import { Header } from "/src/components/common/Header.js";
import { MovieSection } from "/src/components/movies/ListMovie/MovieSection.js";
import { fetchMoviesByUser } from "/src/services/movieService.js";

export async function MyMovies(currentUser) {
  const fragment = document.createDocumentFragment();

  const { data: { filmes } } = await fetchMoviesByUser(currentUser.token);

  fragment.appendChild(Header(currentUser));

  const section = await MovieSection("Meus Filmes", filmes);
  fragment.appendChild(section);

  return fragment;
}
