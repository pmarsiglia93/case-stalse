export const getImdbRating = (movie) => {
  const rating = Number.parseFloat(movie.imdbRating);
  return Number.isFinite(rating) ? rating : -1;
};

export const sortMoviesByRating = (movies) => [...movies].sort((a, b) => {
  const ratingDifference = getImdbRating(b) - getImdbRating(a);
  if (ratingDifference !== 0) return ratingDifference;
  return a.Title.localeCompare(b.Title);
});
