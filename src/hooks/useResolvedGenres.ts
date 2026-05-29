import { useMemo } from 'react';
import { useTmdbStore } from '../store/tmdbStore';
import { GENRE_COLORS } from '../constants/genres';
import type { ResolvedGenre } from '../models/movieModel';

export type { ResolvedGenre };

export default function useResolvedGenres(genres: string[] | undefined): ResolvedGenre[] {
  const movieGenres = useTmdbStore((s) => s.movieGenres);
  const tvGenres = useTmdbStore((s) => s.tvGenres);

  const genreMap = useMemo(() => {
    const all = [...(movieGenres || []), ...(tvGenres || [])];
    return new Map<number, string>(all.map((g) => [g.id, g.name]));
  }, [movieGenres, tvGenres]);

  return useMemo(() => {
    if (!genres || genres.length === 0) return [];
    return genres.map((g) => {
      let label = g;
      let color = GENRE_COLORS[g] ?? 'default';

      if (/^\d+$/.test(g)) {
        const id = Number(g);
        const name = genreMap.get(id);
        if (name) {
          label = name;
          color = GENRE_COLORS[name] ?? 'default';
        }
      }

      return { key: g, label, color } as ResolvedGenre;
    });
  }, [genres, genreMap]);
}
