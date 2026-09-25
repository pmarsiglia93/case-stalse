import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import StateMessage from '../components/StateMessage';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { sortMoviesByRating } from '../utils/movieSort';

export default function MyListPage() {
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const orderedFavorites = sortMoviesByRating(favorites);
  const countKey = orderedFavorites.length === 1 ? 'myList.count.one' : 'myList.count.other';
  return (
    <main className="page-shell">
      <header className="page-intro container"><p className="eyebrow">{t('myList.eyebrow')}</p><h1>{t('myList.title')}</h1><p>{t('myList.description')}</p></header>
      <div className="container">{orderedFavorites.length
        ? <><p className="results-count">{t(countKey, { count: orderedFavorites.length })}</p><div className="movie-grid">{orderedFavorites.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}</div></>
        : <StateMessage title={t('myList.empty')} message={t('myList.emptyMessage')} action={<Link className="button button--primary" to="/movies">{t('myList.explore')}</Link>} />}
      </div>
    </main>
  );
}
