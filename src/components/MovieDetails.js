// src/components/MovieDetails.js
import React, { useEffect, useState } from 'react';

const MovieDetails = ({ movieTitle }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=1e5700a2`);
                const data = await response.json();

                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error);
                }
            } catch (error) {
                setError('Erro ao buscar as informações do filme.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieTitle]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div style={styles.container}>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} style={styles.poster} />
            <p><strong>Ano:</strong> {movie.Year}</p>
            <p><strong>Escritor:</strong> {movie.Writer}</p>
            <p><strong>Idioma:</strong> {movie.Language}</p>
            <p><strong>País:</strong> {movie.Country}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    poster: {
        width: '200px',
        margin: '20px 0',
    },
};

export default MovieDetails;
