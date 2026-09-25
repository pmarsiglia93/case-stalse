import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Icon from './Icon';
import MovieCard from './MovieCard';

export default function MovieRail({ title, description, movies, action }) {
  const railRef = useRef(null);
  const { t } = useLanguage();
  const scroll = (direction) => railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * .75, behavior: 'smooth' });
  const id = `section-${title.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <section className="content-section" aria-labelledby={id}>
      <div className="section-heading"><div><p className="eyebrow">{t('common.explore')}</p><h2 id={id}>{title}</h2>{description && <p>{description}</p>}</div>
        <div className="rail-actions">{action}<button type="button" className="icon-button rail-button" onClick={() => scroll(-1)} aria-label={t('rail.previous', { title })}><Icon name="arrowLeft" /></button><button type="button" className="icon-button rail-button" onClick={() => scroll(1)} aria-label={t('rail.next', { title })}><Icon name="arrowRight" /></button></div>
      </div>
      <div className="movie-rail" ref={railRef}>{movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}</div>
    </section>
  );
}
