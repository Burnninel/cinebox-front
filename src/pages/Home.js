import { Header } from "/src/components/common/Header.js";
import { MovieSection } from "/src/components/movies/ListMovie/MovieSection.js";
import { fetchAllMovies } from "/src/services/movieService.js";

export async function Home(currentUser) {
  const fragment = document.createDocumentFragment();
  const { data: filmes } = await fetchAllMovies();

  const header = Header(currentUser);
  fragment.appendChild(header);

  const section = await MovieSection("Explorar", filmes);
  fragment.appendChild(section);

  return fragment;
}
