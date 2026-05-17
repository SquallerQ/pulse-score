export const DEFAULT_LEAGUE = 'PL';
export const DEFAULT_SEASON = '2025';
export const DEFAULT_MODE = 'league';

export const VALID_LEAGUES = ['PL', 'PD', 'CL', 'SA', 'BL1', 'FL1'] as const;
export const VALID_MODES = ['league', 'cup'] as const;

export type LeagueCode = (typeof VALID_LEAGUES)[number];
export type CompetitionMode = (typeof VALID_MODES)[number];

export function isValidLeague(code: string | null): code is LeagueCode {
  if (!code) return false;
  return (VALID_LEAGUES as readonly string[]).includes(code);
}

export function isValidSeason(value: string | null): value is string {
  if (!value) return false;

  return /^\d{4}$/.test(value);
}

export function isValidMode(value: string | null): value is CompetitionMode {
  if (!value) return false;
  return (VALID_MODES as readonly string[]).includes(value);
}

export function normalizeLeague(code: string | null): LeagueCode {
  return isValidLeague(code) ? code : DEFAULT_LEAGUE;
}

export function normalizeSeason(value: string | null): string {
  return isValidSeason(value) ? value : DEFAULT_SEASON;
}

export function normalizeMode(value: string | null): CompetitionMode {
  return isValidMode(value) ? value : DEFAULT_MODE;
}
