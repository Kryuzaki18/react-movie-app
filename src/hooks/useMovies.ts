/**
 * Convenience re-export of the React Query hooks for home page collections.
 * Keeps the hook name stable so any future consumers don't need to change.
 */
export {
  useFeaturedMoviesQuery  as useFeaturedMovies,
  useTrendingMoviesQuery  as useTrendingMovies,
  useNewReleasesQuery     as useNewReleases,
} from '../api/useMoviesQuery';
