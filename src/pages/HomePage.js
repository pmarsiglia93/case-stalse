import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MovieRail from '../components/MovieRail';
import { CardSkeleton } from '../components/Skeleton';
import StateMessage from '../components/StateMessage';
import { useLanguage } from '../context/LanguageContext';
import { collections, getCatalogEntries } from '../data/catalog';
import { getCatalogMovies } from '../services/omdbApi';
import { sortMoviesByRating } from '../utils/movieSort';

function RailLoader() {
  const { t } = useLanguage();
  return <div className="movie-rail movie-rail--loading" aria-label={t('common.loadingMovies')} aria-busy="true">{Array.from({ length: 6 }, (_, index) => <CardSkeleton key={index} />)}</div>;
}

function CollectionSection({ id, collection }) {
  const [state, setState] = useState({ movies: [], loading: true, error: '' });
  const { t } = useLanguage();
  const title = t(`collection.${id}.title`, {}, collection.title);
  const description = t(`collection.${id}.description`, {}, collection.description);

  useEffect(() => {
    let active = true;
    getCatalogMovies(getCatalogEntries({ ids: collection.ids }))
      .then((movies) => active && setState({ movies: sortMoviesByRating(movies), loading: false, error: '' }))
      .catch(() => active && setState({ movies: [], loading: false, error: t('collection.unavailable') }));
    return () => { active = false; };
  }, [collection, t]);

  if (state.loading) return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">{t('common.explore')}</p><h2>{title}</h2><p>{description}</p></div></div><RailLoader /></section>;
  if (state.error || !state.movies.length) return <section className="content-section"><StateMessage compact title={title} message={state.error || t('collection.unavailable')} /></section>;
  return <MovieRail title={title} description={description} movies={state.movies} action={<Link className="text-link" to={collection.href}>{t('common.seeAll')}</Link>} />;
}

export default function HomePage() {
  return <main><Hero /><div className="container home-content">{Object.entries(collections).map(([id, collection]) => <CollectionSection key={id} id={id} collection={collection} />)}</div></main>;
}
