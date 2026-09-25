import { getImdbRating } from './movieSort';

const aliasReplacements = [
  [/\bhomem aranha\b/g, 'spider man'],
  [/\bspiderman\b/g, 'spider man'],
  [/\baranhaverso\b/g, 'spider verse'],
  [/\baranha\b/g, 'spider'],
  [/\bguerra civil\b/g, 'civil war'],
  [/\bvingadores?\b/g, 'avengers'],
  [/\bhomem de ferro\b/g, 'iron man'],
  [/\bcapitao america\b/g, 'captain america'],
  [/\bcapita marvel\b/g, 'captain marvel'],
  [/\bpantera negra\b/g, 'black panther'],
  [/\bmulher maravilha\b/g, 'wonder woman'],
  [/\bliga da justica\b/g, 'justice league'],
  [/\besquadrao suicida\b/g, 'suicide squad'],
  [/\bguardioes da galaxia\b/g, 'guardians'],
  [/\bquarteto fantastico\b/g, 'fantastic four'],
  [/\bdoutor estranho\b/g, 'doctor strange'],
  [/\bhomem de aco\b/g, 'man of steel'],
  [/\bsuper homem\b/g, 'superman'],
  [/\bcavaleiro das trevas\b/g, 'dark knight'],
  [/\bjusticeiro\b/g, 'punisher'],
  [/\bdemolidor\b/g, 'daredevil'],
  [/\bmonstro do pantano\b/g, 'swamp thing'],
  [/\btartarugas ninja\b/g, 'tmnt'],
  [/\buniverso cinematografico marvel\b/g, 'mcu'],
];

const stopWords = new Set([
  'a', 'as', 'da', 'das', 'de', 'do', 'dos', 'e', 'filme', 'filmes',
  'movie', 'movies', 'o', 'os', 'the',
]);

export const normalizeSearch = (value = '') => String(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const canonicalizeQuery = (query) => {
  const normalized = aliasReplacements.reduce(
    (value, [pattern, replacement]) => value.replace(pattern, replacement),
    normalizeSearch(query)
  );
  return normalized.split(' ').filter((term) => term && !stopWords.has(term)).join(' ');
};

const getSearchScore = (movie, query) => {
  const movieTitle = movie.Title || movie.title || '';
  const movieYear = movie.Year || movie.year || '';
  const title = normalizeSearch(movieTitle);
  const franchises = normalizeSearch([movie.franchise, ...(movie.relatedFranchises || [])].join(' '));
  const searchableText = normalizeSearch([
    movieTitle,
    movieYear,
    movie.Genre,
    movie.Actors,
    movie.Director,
    movie.Plot,
    movie.universe,
    movie.franchise,
    movie.relatedFranchises,
    movie.collection,
  ].filter(Boolean).join(' '));
  const terms = query.split(' ').filter(Boolean);

  if (!terms.length || !terms.every((term) => searchableText.includes(term))) return 0;
  if (title === query) return 100;
  if (title.startsWith(query)) return 85;
  if (title.includes(query)) return 70;
  if (franchises.includes(query)) return 60;
  if (normalizeSearch(movie.collection).includes(query)) return 55;
  return 30 + terms.length;
};

export const searchCatalogMovies = (movies, query) => {
  const canonicalQuery = canonicalizeQuery(query);
  if (!canonicalQuery) return [];

  return movies
    .map((movie) => ({ movie, score: getSearchScore(movie, canonicalQuery) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      const relevanceDifference = b.score - a.score;
      if (relevanceDifference !== 0) return relevanceDifference;
      const ratingDifference = getImdbRating(b.movie) - getImdbRating(a.movie);
      if (ratingDifference !== 0) return ratingDifference;
      return (a.movie.Title || a.movie.title).localeCompare(b.movie.Title || b.movie.title);
    })
    .map(({ movie }) => movie);
};

export const filterCatalogMovies = searchCatalogMovies;
