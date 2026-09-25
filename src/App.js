import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import CatalogPage from './pages/CatalogPage';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MyListPage from './pages/MyListPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function Application() {
  const { t } = useLanguage();
  return (
    <FavoritesProvider>
      <ScrollToTop />
      <a className="skip-link" href="#main-content">{t('skip')}</a>
      <Header />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<CatalogPage />} />
          <Route path="/marvel" element={<CatalogPage type="marvel" />} />
          <Route path="/dc" element={<CatalogPage type="dc" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/spiderman" element={<Navigate to="/search?q=Spider-Man" replace />} />
          <Route path="/avengers" element={<Navigate to="/search?q=Avengers" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </FavoritesProvider>
  );
}

export default function App() {
  return <BrowserRouter><LanguageProvider><Application /></LanguageProvider></BrowserRouter>;
}
