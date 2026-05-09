import type { Genre } from '../models/movie';

export const GENRES: Genre[] = [
  { label: 'All',       value: 'all'       },
  { label: 'Action',    value: 'Action'    },
  { label: 'Drama',     value: 'Drama'     },
  { label: 'Comedy',    value: 'Comedy'    },
  { label: 'Thriller',  value: 'Thriller'  },
  { label: 'Sci-Fi',    value: 'Sci-Fi'    },
  { label: 'Horror',    value: 'Horror'    },
  { label: 'Romance',   value: 'Romance'   },
  { label: 'Animation', value: 'Animation' },
];

export const GENRE_COLORS: Record<string, string> = {
  Action:    'red',
  Drama:     'blue',
  Comedy:    'gold',
  Thriller:  'purple',
  'Sci-Fi':  'cyan',
  Horror:    'volcano',
  Romance:   'pink',
  Animation: 'green',
};
