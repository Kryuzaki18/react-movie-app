import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from './watchlistApi';
import { watchlistKeys } from './queryKeys';
import { useAuthStore } from '../store/authStore';
import type { Movie } from '../models/movie';

export function useWatchlistQuery() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey:  watchlistKeys.list(),
    queryFn:   () => getWatchlist(),
    enabled:   !!isAuthenticated,
    staleTime: 5 * 60 * 1000,
    select:    (data) => data.watchlist,
  });
}

export function useAddToWatchlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movie: Movie) => addToWatchlist(movie),
    onSuccess: (data) => {
      queryClient.setQueryData(watchlistKeys.list(), data);
    },
  });
}

export function useRemoveFromWatchlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movieId: string | number) => removeFromWatchlist(movieId),
    onSuccess: (data) => {
      queryClient.setQueryData(watchlistKeys.list(), data);
    },
  });
}
