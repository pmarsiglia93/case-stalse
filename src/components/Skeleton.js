import { useLanguage } from '../context/LanguageContext';

export function CardSkeleton() { return <div className="card-skeleton" aria-hidden="true"><span /><i /><i /></div>; }
export default function SkeletonGrid({ count = 6 }) {
  const { t } = useLanguage();
  return <div className="movie-grid" aria-label={t('common.loadingMovies')} aria-busy="true">{Array.from({ length: count }, (_, index) => <CardSkeleton key={index} />)}</div>;
}
