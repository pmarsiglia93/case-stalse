import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredMovies } from '../data/catalog';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeMovie } from '../services/movieLocalization';
import { getMovieDetails } from '../services/omdbApi';
import Icon from './Icon';
import './Hero.css';

const SLIDE_DURATION = 9000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [details, setDetails] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const active = featuredMovies[activeIndex];
  const { isFavorite, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();

  useEffect(() => {
    featuredMovies.forEach(({ desktopImage, mobileImage }) => {
      const desktop = new Image();
      const mobile = new Image();
      desktop.src = desktopImage;
      mobile.src = mobileImage;
    });
  }, []);

  useEffect(() => {
    if (!playing || hovered || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % featuredMovies.length), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeIndex, hovered, playing]);

  useEffect(() => {
    let mounted = true;
    setDetails(null);
    getMovieDetails(active.imdbID)
      .then((movie) => localizeMovie(movie, language))
      .then((movie) => mounted && setDetails(movie))
      .catch(() => {});
    return () => { mounted = false; };
  }, [active.imdbID, language]);

  const favoriteMovie = details || { imdbID: active.imdbID, Title: active.title, Year: String(active.year), Poster: 'N/A', Type: 'movie' };
  const favorite = isFavorite(active.imdbID);
  const goTo = (index) => setActiveIndex((index + featuredMovies.length) % featuredMovies.length);

  return (
    <section className={`hero ${!playing || hovered ? 'hero--paused' : ''}`} aria-roledescription="carousel" aria-label={t('hero.featured')} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <picture className="hero__media" key={active.imdbID}>
        <source media="(max-width: 640px)" srcSet={active.mobileImage} />
        <img src={active.desktopImage} alt="" fetchpriority="high" />
      </picture>
      <div className="hero__shade" />
      <div className="hero__content container">
        <div className="hero__copy" key={`copy-${active.imdbID}-${language}`} aria-live="polite">
          <p className="hero__eyebrow"><span>{String(activeIndex + 1).padStart(2, '0')}</span>{t(`hero.${active.imdbID}.eyebrow`)}</p>
          <h1>{details?.Title || active.title}</h1>
          <div className="hero__meta" aria-label={t('hero.info')}>
            {details?.imdbRating && details.imdbRating !== 'N/A' && <span className="rating"><Icon name="star" size={15} filled /> {details.imdbRating}</span>}
            <span>{details?.Year || active.year}</span>
            {details?.Rated && details.Rated !== 'N/A' && <span className="classification">{details.Rated}</span>}
            {details?.Runtime && details.Runtime !== 'N/A' && <span>{details.Runtime}</span>}
          </div>
          <p className="hero__description translated-content">{details?.Plot && details.Plot !== 'N/A' ? details.Plot : t(`hero.${active.imdbID}.description`)}</p>
          <div className="hero__actions">
            <Link className="button button--primary" to={`/movie/${active.imdbID}`}><Icon name="play" filled /> {t('hero.details')}</Link>
            <button className="button button--glass" type="button" aria-pressed={favorite} onClick={() => toggleFavorite(favoriteMovie)}><Icon name={favorite ? 'check' : 'plus'} /> {favorite ? t('hero.inList') : t('hero.myList')}</button>
          </div>
        </div>
      </div>
      <div className="hero__navigation container">
        <div className="hero__choices" aria-label={t('hero.select')}>
          {featuredMovies.map((movie, index) => (
            <button key={movie.imdbID} className={`hero__choice ${index === activeIndex ? 'active' : ''}`} type="button" onClick={() => goTo(index)} aria-label={`${t('hero.select')}: ${movie.title}`} aria-current={index === activeIndex ? 'true' : undefined}>
              <span className="hero__choice-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="hero__choice-copy"><small>{t(`hero.${movie.imdbID}.eyebrow`)}</small><strong>{movie.title}</strong></span>
              <span className="hero__progress" aria-hidden="true"><span /></span>
            </button>
          ))}
        </div>
        <div className="hero__controls">
          <button className="icon-button" type="button" onClick={() => goTo(activeIndex - 1)} aria-label={t('hero.previous')}><Icon name="arrowLeft" /></button>
          <button className="icon-button" type="button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? t('hero.pause') : t('hero.resume')}><Icon name={playing ? 'pause' : 'play'} filled={!playing} /></button>
          <button className="icon-button" type="button" onClick={() => goTo(activeIndex + 1)} aria-label={t('hero.next')}><Icon name="arrowRight" /></button>
        </div>
      </div>
    </section>
  );
}
