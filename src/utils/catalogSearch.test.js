import { normalizeSearch, searchCatalogMovies } from './catalogSearch';

const movies = [
  { imdbID: '1', Title: 'Spider-Man', Year: '2002', imdbRating: '7.4', franchise: 'spider-man', universe: 'marvel' },
  { imdbID: '2', Title: 'The Amazing Spider-Man', Year: '2012', imdbRating: '6.9', franchise: 'spider-man', universe: 'marvel' },
  { imdbID: '3', Title: 'The Dark Knight', Year: '2008', imdbRating: '9.0', franchise: 'batman', universe: 'dc' },
];

test.each(['spider man', 'Spider-Man', 'spiderman', 'homem-aranha', 'filmes do homem aranha'])(
  'encontra Spider-Man usando a variação %s',
  (query) => {
    const results = searchCatalogMovies(movies, query);
    expect(results).toHaveLength(2);
    expect(results[0].Title).toBe('Spider-Man');
  }
);

test('ignora acentos, pontuação e reconhece aliases em português', () => {
  expect(normalizeSearch('  Capitão-América! ')).toBe('capitao america');
  expect(searchCatalogMovies(movies, 'cavaleiro das trevas')[0].Title).toBe('The Dark Knight');
});

test('permite buscar por ano e universo', () => {
  expect(searchCatalogMovies(movies, 'marvel 2012').map(({ Title }) => Title)).toEqual(['The Amazing Spider-Man']);
});
