import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import Poster from '../components/Poster';
import SkeletonGrid from '../components/Skeleton';
import StateMessage from '../components/StateMessage';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { isCatalogMovie } from '../data/catalog';
import { localizeMovie } from '../services/movieLocalization';
import { getMovieDetails } from '../services/omdbApi';

const DetailItem = ({ label, value }) => value && value !== 'N/A' ? <div className="detail-item"><dt>{label}</dt><dd>{value}</dd></div> : null;

export default function MovieDetailsPage() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();

  useEffect(() => {
    let active = true;
    setMovie(null);
    setError('');
    if (!isCatalogMovie(imdbID)) {
      setError(t('details.outside'));
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    getMovieDetails(imdbID)
      .then((data) => localizeMovie(data, language))
      .then((data) => active && setMovie(data))
      .catch(() => active && setError(t('details.loadError')))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [imdbID, language, t]);

  if (loading) return <main className="page-shell container details-loading"><SkeletonGrid count={4} /></main>;
  if (error || !movie) return <main className="page-shell container"><StateMessage title={t('details.outsideTitle')} message={error || t('details.loadError')} action={<Link className="button button--primary" to="/movies">{t('details.explore')}</Link>} /></main>;

  const favorite = isFavorite(movie.imdbID);
  const imdbUrl = `https://www.imdb.com/title/${movie.imdbID}/`;

  return (
    <main className="movie-details">
      {movie.Poster !== 'N/A' && <img className="movie-details__backdrop" src={movie.Poster} alt="" aria-hidden="true" />}
      <div className="movie-details__shade" />
      <div className="movie-details__content container">
        <Link className="back-link" to="/movies"><Icon name="arrowLeft" /> {t('details.back')}</Link>
        <div className="movie-details__layout">
          <Poster className="movie-details__poster" src={movie.Poster} alt={movie.Title} eager />
          <section className="movie-details__info">
            <p className="eyebrow">{t('details.eyebrow')}</p>
            <h1>{movie.Title}</h1>
            <div className="movie-details__meta">
              {movie.imdbRating !== 'N/A' && <span className="rating"><Icon name="star" filled size={17} /> {movie.imdbRating} IMDb</span>}
              <span>{movie.Year}</span>
              {movie.Rated !== 'N/A' && <span className="classification">{movie.Rated}</span>}
              {movie.Runtime !== 'N/A' && <span>{movie.Runtime}</span>}
            </div>
            {movie.Genre !== 'N/A' && <div className="genre-list translated-content">{movie.Genre.split(',').map((genre) => <span key={genre}>{genre.trim()}</span>)}</div>}
            <p className="movie-details__plot translated-content">{movie.Plot}</p>
            <div className="movie-details__actions">
              <button className="button button--primary" type="button" aria-pressed={favorite} onClick={() => toggleFavorite(movie)}><Icon name={favorite ? 'check' : 'plus'} /> {favorite ? t('details.inList') : t('details.add')}</button>
              <a className="button button--glass" href={imdbUrl} target="_blank" rel="noreferrer">{t('details.imdb')} <Icon name="external" /></a>
            </div>
            <dl className="details-list">
              <DetailItem label={t('details.director')} value={movie.Director} />
              <DetailItem label={t('details.cast')} value={movie.Actors} />
              <DetailItem label={t('details.writer')} value={movie.Writer} />
              <DetailItem label={t('details.country')} value={movie.Country} />
              <DetailItem label={t('details.language')} value={movie.Language} />
              <DetailItem label={t('details.awards')} value={movie.Awards} />
            </dl>
            <div className="score-grid">
              <div><span>IMDb</span><strong>{movie.imdbRating !== 'N/A' ? movie.imdbRating : '—'}</strong><small>/ 10</small></div>
              <div><span>Metascore</span><strong>{movie.Metascore !== 'N/A' ? movie.Metascore : '—'}</strong><small>/ 100</small></div>
              <div><span>{t('details.votes')}</span><strong>{movie.imdbVotes !== 'N/A' ? movie.imdbVotes : '—'}</strong></div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
