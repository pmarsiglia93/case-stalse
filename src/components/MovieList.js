// src/components/MovieList.js
import React from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import './MovieList.css';

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-arrow slick-next" onClick={onClick}>
            &gt;
        </div>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="slick-arrow slick-prev" onClick={onClick}>
            &lt;
        </div>
    );
};

const MovieList = ({ movies }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Apenas um slide visível por vez
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 768, // Tamanho da tela onde o slider será ativado
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                }
            }
        ]
    };

    return (
        <div className="movie-list">
            <div className="slider-mobile">
                <Slider {...settings}>
                    {movies.map(movie => (
                        <div key={movie.imdbID} className="movie-card-container">
                            <MovieCard
                                title={movie.Title}
                                year={movie.Year}
                                poster={movie.Poster}
                                writer={movie.Writer}
                                language={movie.Language}
                                country={movie.Country}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="cards-desktop">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.imdbID}
                        title={movie.Title}
                        year={movie.Year}
                        poster={movie.Poster}
                        writer={movie.Writer}
                        language={movie.Language}
                        country={movie.Country}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
