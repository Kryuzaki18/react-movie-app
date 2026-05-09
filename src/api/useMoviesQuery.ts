/**
 * React Query hooks for movie data.
 *
 * Stale-time is set to Infinity for static data — no background refetches
 * needed. When a real API is wired in, lower stale times appropriately.
 */

import { useQuery } from '@tanstack/react-query';
import { movieKeys } from './queryKeys';
import {
  fetchFeaturedMovies,
  fetchTrendingMovies,
  fetchNewReleases,
  fetchMovieById,
} from './movieApi';

const STATIC_STALE_TIME = Infinity; // data never goes stale (static source)

export function useFeaturedMoviesQuery() {
  return useQuery({
    queryKey: movieKeys.featured(),
    queryFn:  fetchFeaturedMovies,
    staleTime: STATIC_STALE_TIME,
  });
}

export function useTrendingMoviesQuery() {
  return useQuery({
    queryKey: movieKeys.trending(),
    queryFn:  fetchTrendingMovies,
    staleTime: STATIC_STALE_TIME,
  });
}

export function useNewReleasesQuery() {
  return useQuery({
    queryKey: movieKeys.newReleases(),
    queryFn:  fetchNewReleases,
    staleTime: STATIC_STALE_TIME,
  });
}

export function useMovieDetailQuery(id: number | null) {
  return useQuery({
    queryKey: movieKeys.detail(id ?? 0),
    queryFn:  () => fetchMovieById(id!),
    enabled:  id !== null,
    staleTime: STATIC_STALE_TIME,
  });
}
