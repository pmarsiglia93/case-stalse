import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Icon from './Icon';

export default function SearchBar({ initialValue = '', autoFocus = false, onValueChange }) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();
  const { t } = useLanguage();
  useEffect(() => setValue(initialValue), [initialValue]);
  const handleChange = (event) => { setValue(event.target.value); onValueChange?.(event.target.value); };
  const handleSubmit = (event) => { event.preventDefault(); const query = value.trim(); navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search'); };
  const clear = () => { setValue(''); onValueChange?.(''); navigate('/search'); };
  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <Icon name="search" size={21} />
      <label className="sr-only" htmlFor="movie-search">{t('search.label')}</label>
      <input autoFocus={autoFocus} id="movie-search" type="search" value={value} onChange={handleChange} placeholder={t('search.placeholder')} autoComplete="off" />
      {value && <button className="search-bar__clear" type="button" onClick={clear}>{t('search.clear')}</button>}
      <button className="button button--primary search-bar__submit" type="submit">{t('search.submit')}</button>
    </form>
  );
}
