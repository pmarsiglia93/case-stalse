import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider } from '../context/FavoritesContext';
import { LanguageProvider } from '../context/LanguageContext';
import { getMovieDetails } from '../services/omdbApi';
import Hero from './Hero';

jest.mock('../services/omdbApi', () => ({ getMovieDetails: jest.fn() }));

beforeEach(() => {
  window.localStorage.clear();
  getMovieDetails.mockReturnValue(new Promise(() => {}));
});

test('permite navegar e pausar os destaques da home', () => {
  render(<MemoryRouter><LanguageProvider><FavoritesProvider><Hero /></FavoritesProvider></LanguageProvider></MemoryRouter>);

  expect(screen.getByRole('heading', { name: 'Avengers: Endgame' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Próximo destaque' }));
  expect(screen.getByRole('heading', { name: 'The Batman' })).toBeInTheDocument();

  const pauseButton = screen.getByRole('button', { name: 'Pausar destaques' });
  fireEvent.click(pauseButton);
  expect(screen.getByRole('button', { name: 'Continuar destaques' })).toBeInTheDocument();
});
