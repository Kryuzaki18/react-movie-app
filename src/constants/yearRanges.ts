export interface YearRange {
  label: string;
  value: string;
  min: number;
  max: number;
}

export const YEAR_RANGES: YearRange[] = [
  { label: 'All Years', value: 'all', min: 0, max: 9999 },
  { label: '2026', value: '2026', min: 2026, max: 2026 },
  { label: '2025', value: '2025', min: 2025, max: 2025 },
  { label: '2020–2025', value: '2020-2025', min: 2020, max: 2025 },
  { label: '2010–2019', value: '2010-2019', min: 2010, max: 2019 },
  { label: '2000–2009', value: '2000-2009', min: 2000, max: 2009 },
  { label: '1990–1999', value: '1990-1999', min: 1990, max: 1999 },
  { label: '1980–1989', value: '1980-1989', min: 1980, max: 1989 },
  { label: '1970–1979', value: '1970-1979', min: 1970, max: 1979 },
  { label: 'Before 1970', value: 'old-1969', min: 1000, max: 1969 },
];
