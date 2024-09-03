// src/components/MovieCard.js
import React from 'react';

const MovieCard = ({ title, year, writer, language, country, poster }) => {
    return (
        <div style={styles.card}>
            <img src={poster !== 'N/A' ? poster : 'https://via.placeholder.com/200x300'} alt={title} style={styles.image} />
            <div style={styles.content}>
                <h3>{title}</h3>
                <p><strong>Ano:</strong> {year}</p>
                <p><strong>Escritor:</strong> {writer}</p>
                <p><strong>Idioma:</strong> {language}</p>
                <p><strong>País:</strong> {country}</p>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        width: '200px',
        margin: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
    },
    content: {
        padding: '10px',
    },
};

export default MovieCard;
