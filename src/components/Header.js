import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import Icon from './Icon';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const links = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/movies', labelKey: 'nav.movies' },
  { to: '/marvel', labelKey: 'nav.marvel' },
  { to: '/dc', labelKey: 'nav.dc' },
  { to: '/my-list', labelKey: 'nav.myList' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.search]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return undefined;
    const handleKeyDown = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const desktop = window.matchMedia('(min-width: 901px)');
    const closeOnDesktop = (event) => event.matches && setOpen(false);
    desktop.addEventListener?.('change', closeOnDesktop);
    return () => desktop.removeEventListener?.('change', closeOnDesktop);
  }, []);

  return (
    <header className={`site-header ${scrolled || open ? 'site-header--solid' : ''} ${open ? 'site-header--open' : ''}`}>
      <button className={`nav-backdrop ${open ? 'is-visible' : ''}`} type="button" tabIndex={open ? 0 : -1} aria-label={t('nav.closeMenu')} onClick={() => setOpen(false)} />
      <div className="site-header__inner container">
        <Link className="brand" to="/" aria-label="HeroVerse">
          <span className="brand__mark">H</span><span>Hero<span>Verse</span></span>
        </Link>
        <nav id="primary-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label={t('nav.primary')}>
          <span className="main-nav__label">{t('nav.explore')}</span>
          {links.map(({ to, labelKey, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'active' : ''}>
              <span>{t(labelKey)}</span>
              {to === '/my-list' && favorites.length > 0 && <span className="nav-count">{favorites.length}</span>}
            </NavLink>
          ))}
          <LanguageSwitcher mobile />
          <span className="main-nav__caption">{t('nav.caption')}</span>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <Link className="header-search" to="/search" aria-label={t('nav.openSearch')}><Icon name="search" size={19} /><span>{t('nav.search')}</span></Link>
          <button className="icon-button menu-toggle" type="button" aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
            <Icon name={open ? 'close' : 'menu'} size={23} />
          </button>
        </div>
      </div>
    </header>
  );
}
