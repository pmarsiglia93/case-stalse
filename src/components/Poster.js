import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Icon from './Icon';

export default function Poster({ src, alt, className = '', eager = false }) {
  const [failed, setFailed] = useState(!src || src === 'N/A');
  const { t } = useLanguage();
  if (failed) return <div className={`poster-placeholder ${className}`} role="img" aria-label={`${t('common.posterUnavailable')}: ${alt}`}><Icon name="film" size={34} /><span>{t('common.posterUnavailable')}</span></div>;
  return <img className={className} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}
