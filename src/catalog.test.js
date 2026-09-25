import { catalogEntries, getCatalogEntries } from './data/catalog';
import { sortMoviesByRating } from './utils/movieSort';

test('mantém o acervo histórico completo sem IDs duplicados', () => {
  expect(catalogEntries).toHaveLength(169);
  expect(new Set(catalogEntries.map(({ imdbID }) => imdbID)).size).toBe(catalogEntries.length);
  expect(getCatalogEntries({ universe: 'marvel' })).toHaveLength(81);
  expect(getCatalogEntries({ universe: 'dc' })).toHaveLength(46);
  expect(getCatalogEntries({ universe: 'other' })).toHaveLength(42);
});

test('organiza filmografias principais e relacionamentos compartilhados', () => {
  expect(getCatalogEntries({ franchise: 'spider-man' })).toHaveLength(11);
  expect(getCatalogEntries({ franchise: 'batman' })).toHaveLength(14);
  expect(getCatalogEntries({ franchise: 'superman' })).toHaveLength(12);
  expect(getCatalogEntries({ franchise: 'avengers' })).toHaveLength(5);
  expect(getCatalogEntries({ franchise: 'iron-man' })).toHaveLength(3);
  expect(getCatalogEntries({ franchise: 'captain-america' })).toHaveLength(6);
  expect(getCatalogEntries({ franchise: 'thor' })).toHaveLength(4);
  expect(getCatalogEntries({ franchise: 'x-men' })).toHaveLength(14);
});

test('cobre precursores, cinema internacional e lançamentos de 2026', () => {
  expect(getCatalogEntries({ decade: 1920 }).map(({ title }) => title)).toContain('The Mark of Zorro');
  expect(catalogEntries.some(({ title, collection }) => title === 'Lokah Chapter One: Chandra' && collection === 'Cinema indiano')).toBe(true);
  expect(getCatalogEntries({ decade: 2020 }).some(({ title }) => title === 'Supergirl')).toBe(true);
});

test('ordena pela maior nota IMDb e deixa notas ausentes por último', () => {
  const movies = [
    { Title: 'Nota média', imdbRating: '7.0' },
    { Title: 'Sem nota', imdbRating: 'N/A' },
    { Title: 'Melhor nota', imdbRating: '8.5' },
  ];
  expect(sortMoviesByRating(movies).map(({ Title }) => Title)).toEqual(['Melhor nota', 'Nota média', 'Sem nota']);
});
