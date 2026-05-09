import { MOVIES } from '../constants/movies';
import { YEAR_RANGES } from '../constants/yearRanges';
import type { Movie } from '../models/movie';

// Re-export data constants so existing imports from this path keep working
export { MOVIES }      from '../constants/movies';
export { GENRES }      from '../constants/genres';
export { YEAR_RANGES } from '../constants/yearRanges';
export type { YearRange } from '../constants/yearRanges';

export const getFeaturedMovies = (): Movie[] =>
  MOVIES.filter((m) => m.featured);

export const getTrendingMovies = (): Movie[] =>
  MOVIES.filter((m) => m.trending);

export const getNewReleases = (): Movie[] =>
  MOVIES.filter((m) => m.newRelease);

export const getMoviesByGenre = (genre: string): Movie[] =>
  genre === 'all' ? MOVIES : MOVIES.filter((m) => m.genre.includes(genre));

export const getMoviesByYearRange = (rangeValue: string): Movie[] => {
  const range = YEAR_RANGES.find((r) => r.value === rangeValue);
  if (!range || rangeValue === 'all') return MOVIES;
  return MOVIES.filter((m) => m.year >= range.min && m.year <= range.max);
};

export const getMovieById = (id: number): Movie | undefined =>
  MOVIES.find((m) => m.id === id);

export const searchMovies = (query: string): Movie[] =>
  MOVIES.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase()) ||
      m.genre.some((g) => g.toLowerCase().includes(query.toLowerCase()))
  );
