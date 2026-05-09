/**
 * Centralised query key factory.
 * Using a factory pattern ensures keys are consistent, typed, and easy to
 * invalidate at any granularity (e.g. invalidate all movie queries at once).
 *
 * Keys are plain arrays — no user-supplied values are interpolated without
 * being validated first, preventing accidental key collisions.
 */

export const movieKeys = {
  /** Root key — invalidates every movie query */
  all: ['movies'] as const,

  /** All list queries */
  lists: () => [...movieKeys.all, 'list'] as const,

  /** Specific list by filter params */
  list: (filters: { genre?: string; year?: string; search?: string }) =>
    [...movieKeys.lists(), filters] as const,

  /** Featured / trending / new-releases collections */
  featured:    () => [...movieKeys.all, 'featured']    as const,
  trending:    () => [...movieKeys.all, 'trending']    as const,
  newReleases: () => [...movieKeys.all, 'newReleases'] as const,

  /** Single movie detail */
  details: () => [...movieKeys.all, 'detail'] as const,
  detail:  (id: number) => [...movieKeys.details(), id] as const,
} as const;
