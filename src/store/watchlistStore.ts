import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

export type WatchlistSortBy = 'newest' | 'oldest' | 'az' | 'rating';
export type WatchlistLayout = 'grid' | 'list';

interface WatchlistFilters {
  search:  string;
  sortBy:  WatchlistSortBy;
  layout:  WatchlistLayout;
}

interface WatchlistStoreState extends WatchlistFilters {
  setSearch: (search: string)          => void;
  setSortBy: (sortBy: WatchlistSortBy) => void;
  setLayout: (layout: WatchlistLayout) => void;
  resetFilters: ()                     => void;
}

const INITIAL_FILTERS: WatchlistFilters = {
  search: '',
  sortBy: 'newest',
  layout: 'grid',
};

export const useWatchlistStore = create<WatchlistStoreState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_FILTERS,

        setSearch: (search) => set({ search }, false, 'watchlist/setSearch'),
        setSortBy: (sortBy) => set({ sortBy }, false, 'watchlist/setSortBy'),
        setLayout: (layout) => set({ layout }, false, 'watchlist/setLayout'),
        resetFilters: ()    => set(INITIAL_FILTERS, false, 'watchlist/resetFilters'),
      }),
      {
        name: 'i99flix-watchlist',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          sortBy: state.sortBy,
          layout: state.layout,
        }),
      },
    ),
    { name: 'WatchlistStore' },
  ),
);
