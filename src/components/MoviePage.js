// src/components/MoviePage.js
import React, { useEffect, useState } from 'react';
import HeroBanner from './HeroBanner';
import MovieList from './MovieList';

const MoviePage = ({ movieTitle }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let query = movieTitle;

                const response = await fetch(`https://www.omdbapi.com/?s=${query}&type=movie&apikey=1e5700a2`);
                const data = await response.json();

                if (data.Response === 'True') {
                    const filteredMovies = data.Search.filter(movie => movie.Title.includes(movieTitle));

                    // Ordenar os filmes por ano em ordem decrescente
                    const detailedMovies = await Promise.all(
                        filteredMovies.map(async (movie) => {
                            const detailsResponse = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=1e5700a2`);
                            const details = await detailsResponse.json();
                            return details;
                        })
                    );

                    detailedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)); // Ordenação decrescente por ano

                    setMovies(detailedMovies.slice(0, 4)); // Pega apenas os primeiros 4 filmes após a ordenação
                } else {
                    console.error('Erro ao buscar filmes:', data.Error);
                }
            } catch (error) {
                console.error('Erro ao buscar filmes:', error);
            }
        };

        fetchMovies();
    }, [movieTitle]);

    return (
        <div>
            <HeroBanner movieTitle={movieTitle} />
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviePage;
