import { premierLeagueHonours } from './premierLeague.js';

export const championsByCompetitionCode = {
  PL: premierLeagueHonours,
} as const;

export type SupportedChampionsCompetitionCode = keyof typeof championsByCompetitionCode;
