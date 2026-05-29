import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export type WatchlistSortBy = "newest" | "oldest" | "az" | "rating";
export type WatchlistLayout = "grid" | "list";
export type WatchlistMediaFilter = "all" | "movie" | "tv";

interface WatchlistFilters {
  search: string;
  sortBy: WatchlistSortBy;
  layout: WatchlistLayout;
  mediaFilter: WatchlistMediaFilter;
}

interface WatchlistStoreState extends WatchlistFilters {
  setSearch: (search: string) => void;
  setSortBy: (sortBy: WatchlistSortBy) => void;
  setLayout: (layout: WatchlistLayout) => void;
  setMediaFilter: (mediaFilter: WatchlistMediaFilter) => void;
  resetFilters: () => void;
}

const INITIAL_FILTERS: WatchlistFilters = {
  search: "",
  sortBy: "newest",
  layout: "grid",
  mediaFilter: "all",
};

export const useWatchlistStore = create<WatchlistStoreState>()(
  devtools(
    persist(
      (set) => ({
        ...INITIAL_FILTERS,

        setSearch: (search) => set({ search }, false, "watchlist/setSearch"),
        setSortBy: (sortBy) => set({ sortBy }, false, "watchlist/setSortBy"),
        setLayout: (layout) => set({ layout }, false, "watchlist/setLayout"),
        setMediaFilter: (mediaFilter) =>
          set({ mediaFilter }, false, "watchlist/setMediaFilter"),
        resetFilters: () =>
          set(INITIAL_FILTERS, false, "watchlist/resetFilters"),
      }),
      {
        name: "i99flix-watchlist",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          sortBy:      state.sortBy,
          layout:      state.layout,
          mediaFilter: state.mediaFilter,
        }),
      },
    ),
    { name: "WatchlistStore" },
  ),
);
