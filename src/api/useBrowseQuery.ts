/**
 * React Query hook for the Browse page filtered movie list.
 * Reads filter state directly from the Zustand browse store so the query
 * automatically re-runs whenever a filter changes.
 */

import { useQuery } from '@tanstack/react-query';
import { movieKeys } from './queryKeys';
import { fetchMovies } from './movieApi';
import { useBrowseStore } from '../store/browseStore';

export function useBrowseQuery() {
  const { selectedGenre, selectedYear, searchQuery } = useBrowseStore();

  return useQuery({
    queryKey: movieKeys.list({ genre: selectedGenre, year: selectedYear, search: searchQuery }),
    queryFn:  () => fetchMovies({ genre: selectedGenre, year: selectedYear, search: searchQuery }),
    staleTime: Infinity,
    // Keep previous data visible while new filter results load
    placeholderData: (prev) => prev,
  });
}
