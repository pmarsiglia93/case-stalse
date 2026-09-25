import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SkeletonGrid from '../components/Skeleton';
import StateMessage from '../components/StateMessage';
import { languages, useLanguage } from '../context/LanguageContext';
import { belongsToFranchise, decadeOptions, franchiseOptions, getCatalogEntries, universeOptions } from '../data/catalog';
import { getCatalogMovies } from '../services/omdbApi';
import { getImdbRating } from '../utils/movieSort';

const PAGE_SIZE = 30;
const pageSettings = {
  movies: { key: 'movies' },
  marvel: { key: 'marvel', universe: 'marvel' },
  dc: { key: 'dc', universe: 'dc' },
};
const englishFranchises = {
  'black-panther': 'Black Panther', 'captain-america': 'Captain America', 'captain-marvel': 'Captain Marvel',
  daredevil: 'Daredevil', 'doctor-strange': 'Doctor Strange', 'fantastic-four': 'Fantastic Four',
  guardians: 'Guardians of the Galaxy', incredibles: 'The Incredibles', 'iron-man': 'Iron Man', joker: 'Joker',
  'justice-league': 'Justice League', punisher: 'Punisher', 'suicide-squad': 'Suicide Squad',
  'swamp-thing': 'Swamp Thing', tmnt: 'Teenage Mutant Ninja Turtles', 'wonder-woman': 'Wonder Woman',
};
const getMovieYear = (movie) => Number.parseInt(movie.Year || movie.year, 10) || 0;
const englishLabel = (option) => englishFranchises[option.value] || option.value.split('-').map((word) => ({ dc: 'DC', x: 'X' }[word] || `${word.charAt(0).toUpperCase()}${word.slice(1)}`)).join(' ');

export default function CatalogPage({ type = 'movies' }) {
  const config = pageSettings[type];
  const [params, setParams] = useSearchParams();
  const { language, t } = useLanguage();
  const requestedUniverse = universeOptions.some(({ value }) => value === params.get('universe')) ? params.get('universe') : 'all';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('rating');
  const [universe, setUniverse] = useState(config.universe || requestedUniverse);
  const [franchise, setFranchise] = useState('all');
  const [decade, setDecade] = useState('all');
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);

  useEffect(() => { if (!config.universe) setUniverse(requestedUniverse); }, [config.universe, requestedUniverse]);
  useEffect(() => {
    let active = true;
    setLoading(true); setError('');
    getCatalogMovies(getCatalogEntries({ universe: config.universe || (universe === 'all' ? undefined : universe) }))
      .then((results) => active && setMovies(results))
      .catch(() => active && setError(t('catalog.unavailable')))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [config.universe, t, universe]);
  useEffect(() => setVisibleLimit(PAGE_SIZE), [universe, franchise, decade, sort]);

  const scopedMovies = useMemo(() => universe === 'all' ? movies : movies.filter((movie) => movie.universe === universe), [movies, universe]);
  const availableFranchises = useMemo(() => franchiseOptions.filter(({ value }) => scopedMovies.some((movie) => belongsToFranchise(movie, value))), [scopedMovies]);
  useEffect(() => { if (franchise !== 'all' && !availableFranchises.some(({ value }) => value === franchise)) setFranchise('all'); }, [availableFranchises, franchise]);

  const visibleMovies = useMemo(() => {
    const filtered = scopedMovies.filter((movie) => {
      if (franchise !== 'all' && !belongsToFranchise(movie, franchise)) return false;
      if (decade !== 'all' && Math.floor(getMovieYear(movie) / 10) * 10 !== Number(decade)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (sort === 'rating') { const difference = getImdbRating(b) - getImdbRating(a); if (difference) return difference; }
      if (sort === 'az') return a.Title.localeCompare(b.Title);
      if (sort === 'za') return b.Title.localeCompare(a.Title);
      if (sort === 'oldest') return getMovieYear(a) - getMovieYear(b);
      if (sort === 'newest') return getMovieYear(b) - getMovieYear(a);
      return a.Title.localeCompare(b.Title);
    });
  }, [decade, franchise, scopedMovies, sort]);

  const chooseUniverse = (value) => {
    setUniverse(value);
    const nextParams = new URLSearchParams(params);
    if (value === 'all') nextParams.delete('universe'); else nextParams.set('universe', value);
    setParams(nextParams, { replace: true });
  };
  const displayedMovies = visibleMovies.slice(0, visibleLimit);
  const countKey = visibleMovies.length === 1 ? 'catalog.found.one' : 'catalog.found.other';

  return (
    <main className="page-shell">
      <header className="page-intro container"><p className="eyebrow">{t(`catalog.${config.key}.eyebrow`)}</p><h1>{t(`catalog.${config.key}.title`)}</h1><p>{t(`catalog.${config.key}.description`)}</p></header>
      <div className="container">
        <section className="catalog-controls" aria-label={t('catalog.organize')}>
          {!config.universe && <div className="catalog-universes" role="group" aria-label={t('catalog.filterUniverse')}>{universeOptions.map((option) => <button key={option.value} className={universe === option.value ? 'active' : ''} type="button" aria-pressed={universe === option.value} onClick={() => chooseUniverse(option.value)}>{t(`catalog.${option.value === 'other' ? 'others' : option.value}`)}</button>)}</div>}
          <div className="catalog-selects">
            <label className="select-field">{t('catalog.franchise')}<select value={franchise} onChange={(event) => setFranchise(event.target.value)}><option value="all">{t('catalog.allF')}</option>{availableFranchises.map((option) => <option key={option.value} value={option.value}>{language === languages.EN ? englishLabel(option) : option.label}</option>)}</select></label>
            <label className="select-field">{t('catalog.decade')}<select value={decade} onChange={(event) => setDecade(event.target.value)}><option value="all">{t('catalog.allF')}</option>{decadeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <label className="select-field">{t('catalog.sort')}<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="rating">{t('catalog.best')}</option><option value="newest">{t('catalog.newest')}</option><option value="oldest">{t('catalog.oldest')}</option><option value="az">A–Z</option><option value="za">Z–A</option></select></label>
          </div>
        </section>
        {loading && <SkeletonGrid count={15} />}
        {!loading && error && <StateMessage title={t('catalog.unavailable')} message={error} />}
        {!loading && !error && !visibleMovies.length && <StateMessage title={t('catalog.empty')} message={t('catalog.changeFilters')} />}
        {!loading && !error && visibleMovies.length > 0 && <><p className="catalog-summary"><strong>{t(countKey, { count: visibleMovies.length })}</strong></p><div className="movie-grid">{displayedMovies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}</div>{displayedMovies.length < visibleMovies.length && <div className="catalog-more"><button className="button button--glass" type="button" onClick={() => setVisibleLimit((current) => current + PAGE_SIZE)}>{t('catalog.more')}</button><span>{t('catalog.of', { shown: displayedMovies.length, total: visibleMovies.length })}</span></div>}</>}
      </div>
    </main>
  );
}
