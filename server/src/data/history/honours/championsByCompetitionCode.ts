import { premierLeagueHonours } from './premierLeague';
import { laLigaHonours } from './laLiga';
import { bundesligaHonours } from './bundesLiga';
import { ligue1Honours } from './league1';
import { serieAHonours } from './serieA';
import { championsLeagueHonours } from './championsLeague';
import type { CompetitionHonours } from './types';

export const championsByCompetitionCode: Record<string, CompetitionHonours> = {
  PL: premierLeagueHonours,
  PD: laLigaHonours,
  BL1: bundesligaHonours,
  FL1: ligue1Honours,
  SA: serieAHonours,
  CL: championsLeagueHonours,
};
