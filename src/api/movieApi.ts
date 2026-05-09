/**
 * Movie API layer.
 *
 * All functions are async so they are compatible with React Query and can be
 * swapped for real HTTP calls (fetch/axios) without changing any hook code.
 *
 * Security notes:
 * - Input validation on every public function prevents unexpected data shapes
 *   from reaching the filter logic.
 * - No user credentials or sensitive data flow through this layer.
 * - Query parameters are validated against known-good values before use.
 */

import {
  getFeaturedMovies,
  getTrendingMovies,
  getNewReleases,
  getMoviesByGenre,
  getMovieById,
  searchMovies,
} from '../services/movieService';
import { YEAR_RANGES } from '../constants/yearRanges';
import { GENRES } from '../constants/genres';
import type { Movie } from '../models/movie';

// ─── Validation helpers ───────────────────────────────────────────────────────

const VALID_GENRE_VALUES = new Set(GENRES.map((g) => g.value));
const VALID_YEAR_VALUES  = new Set(YEAR_RANGES.map((r) => r.value));

/** Sanitise a genre value — falls back to 'all' if unknown */
function sanitiseGenre(genre: unknown): string {
  if (typeof genre === 'string' && VALID_GENRE_VALUES.has(genre)) return genre;
  return 'all';
}

/** Sanitise a year-range value — falls back to 'all' if unknown */
function sanitiseYear(year: unknown): string {
  if (typeof year === 'string' && VALID_YEAR_VALUES.has(year)) return year;
  return 'all';
}

/** Sanitise a free-text search query — strips leading/trailing whitespace */
function sanitiseSearch(query: unknown): string {
  if (typeof query !== 'string') return '';
  // Limit length to prevent excessive filtering work
  return query.trim().slice(0, 200);
}

// ─── API functions ────────────────────────────────────────────────────────────

export interface MovieFilters {
  genre?:  string;
  year?:   string;
  search?: string;
}

/**
 * Fetch all movies, optionally filtered.
 * Simulates network latency of 0 ms (static data) but is async so React Query
 * can manage loading / error / stale states correctly.
 */
export async function fetchMovies(filters: MovieFilters = {}): Promise<Movie[]> {
  const genre  = sanitiseGenre(filters.genre);
  const year   = sanitiseYear(filters.year);
  const search = sanitiseSearch(filters.search);

  // 1. Genre filter
  let result = getMoviesByGenre(genre);

  // 2. Year range filter
  if (year !== 'all') {
    const range = YEAR_RANGES.find((r) => r.value === year);
    if (range) {
      result = result.filter((m) => m.year >= range.min && m.year <= range.max);
    }
  }

  // 3. Search filter
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q))
    );
  }

  return result;
}

export async function fetchFeaturedMovies(): Promise<Movie[]> {
  return getFeaturedMovies();
}

export async function fetchTrendingMovies(): Promise<Movie[]> {
  return getTrendingMovies();
}

export async function fetchNewReleases(): Promise<Movie[]> {
  return getNewReleases();
}

export async function fetchMovieById(id: number): Promise<Movie> {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`Invalid movie id: ${id}`);
  }
  const movie = getMovieById(id);
  if (!movie) throw new Error(`Movie not found: ${id}`);
  return movie;
}

export async function fetchSearchMovies(query: string): Promise<Movie[]> {
  const safe = sanitiseSearch(query);
  if (!safe) return [];
  return searchMovies(safe);
}
