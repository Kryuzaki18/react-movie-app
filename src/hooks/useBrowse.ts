import { useState, useMemo } from 'react';
import { getMoviesByGenre } from '../services/movieService';
import { YEAR_RANGES } from '../constants';
import type { Movie } from '../models/movie';

export const useBrowse = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedYear,  setSelectedYear]  = useState<string>('all');
  const [searchQuery,   setSearchQuery]   = useState<string>('');

  const movies = useMemo<Movie[]>(() => {
    // 1. Start from genre filter
    let result = getMoviesByGenre(selectedGenre);

    // 2. Apply year range filter
    if (selectedYear !== 'all') {
      const range = YEAR_RANGES.find((r) => r.value === selectedYear);
      if (range) {
        result = result.filter((m) => m.year >= range.min && m.year <= range.max);
      }
    }

    // 3. Apply search query on top
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.genre.some((g) => g.toLowerCase().includes(q))
      );
    }

    return result;
  }, [selectedGenre, selectedYear, searchQuery]);

  return {
    movies,
    selectedGenre, setSelectedGenre,
    selectedYear,  setSelectedYear,
    searchQuery,   setSearchQuery,
  };
};
