/**
 * Shared genre map utility.
 * Fetches the TMDB genre list once and returns a Map<id, name>.
 * Used by both useBrowseQuery and useMoviesQuery to avoid duplication.
 */

import { fetchTmdbGenresMovie, fetchTmdbGenresTv } from '../api/tmdbApi';
import { buildGenreMap } from './tmdbAdapter';

export async function getGenreMap(): Promise<Map<number, string>> {
  try {
    const [movieRes, tvRes] = await Promise.all([
      fetchTmdbGenresMovie(),
      fetchTmdbGenresTv(),
    ]);
    const mergedGenres = [...movieRes.genres, ...tvRes.genres];
    return buildGenreMap(mergedGenres);
  } catch {
    return new Map();
  }
}
