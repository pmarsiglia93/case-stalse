import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';
import { catalogEntries, isCatalogMovie } from './data/catalog';
import SearchPage from './pages/SearchPage';
import { getCatalogMovies } from './services/omdbApi';
import { searchCatalogMovies } from './utils/catalogSearch';

jest.mock('./services/omdbApi', () => ({ getCatalogMovies: jest.fn() }));

const movie = { imdbID: 'tt1877830', Title: 'The Batman', Year: '2022', Poster: 'N/A', Type: 'movie', universe: 'dc', franchise: 'batman' };

const renderWithProviders = (ui, route = '/') => render(
  <MemoryRouter initialEntries={[route]}>
    <LanguageProvider><FavoritesProvider>{ui}</FavoritesProvider></LanguageProvider>
  </MemoryRouter>
);

beforeEach(() => {
  window.localStorage.clear();
  getCatalogMovies.mockReset();
});

test('renderiza as informações principais de um card', () => {
  renderWithProviders(<MovieCard movie={movie} />);
  expect(screen.getByRole('heading', { name: 'The Batman' })).toBeInTheDocument();
  expect(screen.getByText('2022')).toBeInTheDocument();
  expect(screen.getByLabelText(/Poster indisponível/)).toBeInTheDocument();
});

test('adiciona e remove um filme da lista persistida', () => {
  renderWithProviders(<MovieCard movie={movie} />);
  fireEvent.click(screen.getByRole('button', { name: /Adicionar The Batman/ }));
  expect(screen.getByRole('button', { name: /Remover The Batman/ })).toHaveAttribute('aria-pressed', 'true');
  expect(JSON.parse(window.localStorage.getItem('heroverse:favorites'))).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: /Remover The Batman/ }));
  expect(JSON.parse(window.localStorage.getItem('heroverse:favorites'))).toHaveLength(0);
});

test('pré-filtra o catálogo e exibe somente resultados relevantes', async () => {
  getCatalogMovies.mockResolvedValue([movie]);
  renderWithProviders(<SearchPage />, '/search?q=Batman');
  const expectedCandidates = searchCatalogMovies(catalogEntries, 'Batman');
  await waitFor(() => expect(getCatalogMovies).toHaveBeenCalledWith(expectedCandidates));
  expect(expectedCandidates.length).toBeLessThan(catalogEntries.length);
  expect(await screen.findByRole('heading', { name: 'The Batman' })).toBeInTheDocument();
  expect(screen.getByText(/1 resultado para/)).toBeInTheDocument();
});

test('exibe estado vazio quando a curadoria não contém o título', async () => {
  getCatalogMovies.mockResolvedValue([movie]);
  renderWithProviders(<SearchPage />, '/search?q=Crippled Avengers');
  expect(await screen.findByRole('heading', { name: 'Nenhum resultado no HeroVerse' })).toBeInTheDocument();
});

test('mantém IDs únicos e rejeita o filme The Avengers de 1998', () => {
  expect(new Set(catalogEntries.map(({ imdbID }) => imdbID)).size).toBe(catalogEntries.length);
  expect(isCatalogMovie('tt0118661')).toBe(false);
});
