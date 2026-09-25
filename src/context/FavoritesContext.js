import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { isCatalogMovie } from '../data/catalog';

const STORAGE_KEY = 'heroverse:favorites';
const FavoritesContext = createContext(null);

const readFavorites = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved.filter((movie) => isCatalogMovie(movie.imdbID)) : [];
  } catch {
    return [];
  }
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites);

  const toggleFavorite = useCallback((movie) => {
    if (!isCatalogMovie(movie.imdbID)) return;
    setFavorites((current) => {
      const exists = current.some((item) => item.imdbID === movie.imdbID);
      const next = exists ? current.filter((item) => item.imdbID !== movie.imdbID) : [...current, movie];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite: (imdbID) => favorites.some((movie) => movie.imdbID === imdbID),
  }), [favorites, toggleFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites deve ser usado dentro de FavoritesProvider.');
  return context;
}
