import { languages, useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher({ mobile = false }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`language-switcher ${mobile ? 'language-switcher--mobile' : ''}`} role="group" aria-label={t('language.label')}>
      <button type="button" className={language === languages.PT ? 'active' : ''} aria-pressed={language === languages.PT} onClick={() => setLanguage(languages.PT)}>{t('language.pt')}</button>
      <button type="button" className={language === languages.EN ? 'active' : ''} aria-pressed={language === languages.EN} onClick={() => setLanguage(languages.EN)}>{t('language.en')}</button>
    </div>
  );
}
