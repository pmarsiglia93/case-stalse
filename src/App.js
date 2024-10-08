// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import MoviePage from './components/MoviePage';
import Footer from './components/Footer'; // Importando o Footer

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<MoviePage movieTitle="Batman" />} />
        <Route path="/spiderman" element={<MoviePage movieTitle="Spider-Man" />} />
        <Route path="/avengers" element={<MoviePage movieTitle="Avengers" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
