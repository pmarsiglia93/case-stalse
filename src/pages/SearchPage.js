import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import SkeletonGrid from '../components/Skeleton';
import StateMessage from '../components/StateMessage';
import { useLanguage } from '../context/LanguageContext';
import { catalogEntries } from '../data/catalog';
import useDebounce from '../hooks/useDebounce';
import { getCatalogMovies } from '../services/omdbApi';
import { searchCatalogMovies } from '../utils/catalogSearch';

const PAGE_SIZE = 30;

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const urlQuery = params.get('q') || '';
  const [input, setInput] = useState(urlQuery);
  const [state, setState] = useState({ movies: [], loading: false, error: '' });
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => setInput(urlQuery), [t, urlQuery]);
  useEffect(() => { const query = debouncedInput.trim(); if (query !== urlQuery) navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search', { replace: true }); }, [debouncedInput, navigate, urlQuery]);
  useEffect(() => {
    let active = true;
    setVisibleLimit(PAGE_SIZE);
    if (!urlQuery.trim()) { setState({ movies: [], loading: false, error: '' }); return undefined; }
    setState({ movies: [], loading: true, error: '' });
    const catalogMatches = searchCatalogMovies(catalogEntries, urlQuery);
    getCatalogMovies(catalogMatches.length ? catalogMatches : catalogEntries)
      .then((movies) => active && setState({ movies: searchCatalogMovies(movies, urlQuery), loading: false, error: '' }))
      .catch(() => active && setState({ movies: [], loading: false, error: t('search.error') }));
    return () => { active = false; };
  }, [t, urlQuery]);

  const displayedMovies = state.movies.slice(0, visibleLimit);
  const resultKey = state.movies.length === 1 ? 'search.results.one' : 'search.results.other';
  return (
    <main className="page-shell search-page"><div className="container">
      <header className="page-intro page-intro--compact"><p className="eyebrow">{t('search.eyebrow')}</p><h1>{t('search.title')}</h1><p>{t('search.description')}</p></header>
      <SearchBar initialValue={urlQuery} autoFocus={!urlQuery} onValueChange={setInput} />
      {state.loading && <SkeletonGrid count={12} />}
      {!state.loading && state.error && <StateMessage title={t('search.error')} message={state.error} />}
      {!state.loading && !state.error && urlQuery && !state.movies.length && <StateMessage title={t('search.none')} message={t('search.noneMessage', { query: urlQuery })} />}
      {!state.loading && !state.error && !urlQuery && <StateMessage title={t('search.promptTitle')} message={t('search.prompt')} />}
      {!state.loading && state.movies.length > 0 && <><p className="results-count">{t(resultKey, { count: state.movies.length })} <strong>“{urlQuery}”</strong>, {t('search.order')}</p><div className="movie-grid">{displayedMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}</div>{displayedMovies.length < state.movies.length && <div className="catalog-more"><button className="button button--glass" type="button" onClick={() => setVisibleLimit((current) => current + PAGE_SIZE)}>{t('search.more')}</button><span>{t('catalog.of', { shown: displayedMovies.length, total: state.movies.length })}</span></div>}</>}
    </div></main>
  );
}
