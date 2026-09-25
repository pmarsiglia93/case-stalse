import { getCatalogEntries } from './data/catalog';
import { searchCatalogMovies } from './utils/catalogSearch';

test('inclui Guerra Civil nas coleções Capitão América e Avengers', () => {
  const civilWarId = 'tt3498820';
  expect(getCatalogEntries({ franchise: 'captain-america' }).some(({ imdbID }) => imdbID === civilWarId)).toBe(true);
  expect(getCatalogEntries({ franchise: 'avengers' }).some(({ imdbID }) => imdbID === civilWarId)).toBe(true);
});

test('encontra Guerra Civil pela expressão em português', () => {
  const civilWar = {
    imdbID: 'tt3498820',
    Title: 'Captain America: Civil War',
    imdbRating: '7.8',
    franchise: 'captain-america',
    relatedFranchises: ['avengers'],
    universe: 'marvel',
  };
  expect(searchCatalogMovies([civilWar], 'guerra civil dos vingadores')).toEqual([civilWar]);
});

test('retorna a trilogia ao buscar Homem de Ferro', () => {
  const trilogy = [
    { Title: 'Iron Man', imdbRating: '7.9', franchise: 'iron-man' },
    { Title: 'Iron Man 2', imdbRating: '6.9', franchise: 'iron-man' },
    { Title: 'Iron Man 3', imdbRating: '7.1', franchise: 'iron-man' },
  ];
  expect(searchCatalogMovies(trilogy, 'homem de ferro')).toHaveLength(3);
});
