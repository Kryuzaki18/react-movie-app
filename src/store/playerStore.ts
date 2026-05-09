/**
 * Player store — controls which movie is currently playing or being previewed.
 *
 * Lifted from App.tsx to eliminate prop-drilling through Home → MovieCard and
 * Browse → MovieCard chains.
 *
 * Security: no sensitive data stored here. Movie objects contain only public
 * metadata (title, thumbnail URLs, etc.).
 *
 * NOT persisted — playback state should reset on page reload.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Movie } from '../models/movie';

interface PlayerState {
  /** Movie currently open in the video player modal */
  playingMovie: Movie | null;
  /** Movie currently open in the detail drawer */
  detailMovie:  Movie | null;

  // Actions
  playMovie:   (movie: Movie) => void;
  closePlayer: () => void;
  openDetail:  (movie: Movie) => void;
  closeDetail: () => void;
  /** Open player and close detail in one atomic update */
  playFromDetail: (movie: Movie) => void;
}

export const usePlayerStore = create<PlayerState>()(
  devtools(
    (set) => ({
      playingMovie: null,
      detailMovie:  null,

      playMovie:   (movie) => set({ playingMovie: movie }, false, 'player/play'),
      closePlayer: ()      => set({ playingMovie: null  }, false, 'player/close'),
      openDetail:  (movie) => set({ detailMovie: movie  }, false, 'player/openDetail'),
      closeDetail: ()      => set({ detailMovie: null   }, false, 'player/closeDetail'),

      playFromDetail: (movie) =>
        set({ detailMovie: null, playingMovie: movie }, false, 'player/playFromDetail'),
    }),
    { name: 'PlayerStore' }
  )
);
