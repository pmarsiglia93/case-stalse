import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import Icon from './Icon';
import Poster from './Poster';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useLanguage();
  const favorite = isFavorite(movie.imdbID);

  return (
    <article className="movie-card">
      <Link className="movie-card__poster-link" to={`/movie/${movie.imdbID}`} aria-label={t('common.detailsOf', { title: movie.Title })}>
        <Poster className="movie-card__poster" src={movie.Poster} alt={movie.Title} />
        <div className="movie-card__overlay" aria-hidden="true"><span className="movie-card__details"><Icon name="play" size={18} filled /> {t('hero.details')}</span></div>
      </Link>
      <button className={`movie-card__favorite ${favorite ? 'is-active' : ''}`} type="button" aria-label={t(favorite ? 'common.removeFromList' : 'common.addToList', { title: movie.Title })} aria-pressed={favorite} onClick={() => toggleFavorite(movie)}>
        <Icon name="heart" size={19} filled={favorite} />
      </button>
      <div className="movie-card__content">
        <Link to={`/movie/${movie.imdbID}`}><h3>{movie.Title}</h3></Link>
        <div className="movie-card__meta">
          <span>{movie.Year}</span>
          {movie.imdbRating && movie.imdbRating !== 'N/A' && <span className="rating"><Icon name="star" size={14} filled /> {movie.imdbRating}</span>}
          <span>{t(movie.Type === 'series' ? 'common.series' : 'common.movie')}</span>
        </div>
      </div>
    </article>
  );
}
