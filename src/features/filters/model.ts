export const DEFAULT_LEAGUE = 'PL';
export const DEFAULT_SEASON = '2025';

export const VALID_LEAGUES = ['PL', 'PD', 'CL', 'SA', 'BL1', 'FL1'] as const;

export type LeagueCode = (typeof VALID_LEAGUES)[number];

export function isValidLeague(code: string | null): code is LeagueCode {
  if (!code) return false;
  return (VALID_LEAGUES as readonly string[]).includes(code);
}

export function isValidSeason(value: string | null): value is string {
  if (!value) return false;

  return /^\d{4}$/.test(value);
}

export function normalizeLeague(code: string | null): LeagueCode {
  return isValidLeague(code) ? code : DEFAULT_LEAGUE;
}

export function normalizeSeason(value: string | null): string {
  return isValidSeason(value) ? value : DEFAULT_SEASON;
}
