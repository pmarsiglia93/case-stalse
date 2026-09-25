import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesProvider } from '../context/FavoritesContext';
import { LanguageProvider } from '../context/LanguageContext';
import Header from './Header';

const renderHeader = () => render(
  <MemoryRouter>
    <LanguageProvider><FavoritesProvider><Header /></FavoritesProvider></LanguageProvider>
  </MemoryRouter>
);

beforeEach(() => {
  window.localStorage.clear();
  document.body.className = '';
});

test('abre e fecha o drawer móvel pelo botão e backdrop', async () => {
  renderHeader();
  const toggle = screen.getByRole('button', { name: 'Abrir menu' });

  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toHaveClass('is-open');
  expect(document.body).toHaveClass('menu-open');

  fireEvent.click(document.querySelector('.nav-backdrop'));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false'));
  expect(document.body).not.toHaveClass('menu-open');
});

test('fecha o drawer móvel com a tecla Escape', async () => {
  renderHeader();
  fireEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
  fireEvent.keyDown(window, { key: 'Escape' });
  await waitFor(() => expect(screen.getByRole('button', { name: 'Abrir menu' })).toBeInTheDocument());
  expect(screen.getByRole('navigation', { name: 'Navegação principal' })).not.toHaveClass('is-open');
});


test('alterna toda a navegação para inglês e persiste a preferência', async () => {
  renderHeader();
  expect(screen.getByRole('link', { name: 'Filmes' })).toBeInTheDocument();

  fireEvent.click(screen.getAllByRole('button', { name: 'EN' })[0]);

  expect(screen.getByRole('link', { name: 'Movies' })).toBeInTheDocument();
  expect(document.documentElement).toHaveAttribute('lang', 'en-US');
  await waitFor(() => expect(window.localStorage.getItem('heroverse:language')).toBe('en-US'));
});
