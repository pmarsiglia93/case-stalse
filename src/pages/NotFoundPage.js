import { Link } from 'react-router-dom';
import StateMessage from '../components/StateMessage';
import { useLanguage } from '../context/LanguageContext';

export default function NotFoundPage() {
  const { t } = useLanguage();
  return <main className="page-shell container"><StateMessage title={t('notFound.title')} message={t('notFound.message')} action={<Link className="button button--primary" to="/">{t('notFound.home')}</Link>} /></main>;
}
