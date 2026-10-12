import type {
  CompetitionSeasonsResponseSchema,
  PulseScoreHistorySeasonResponseSchema,
  PulseScoreChampionsLeagueSeasonsResponseSchema,
  PulseScoreChampionsLeagueSeasonResponseSchema,
  PulseScoreCompetitionHonoursResponseSchema,
  PulseScoreAllTimeScorersResponseSchema,
} from './types';

import {
  competitionSeasonsSchema,
  pulseScoreHistorySeasonSchema,
  pulseScoreChampionsLeagueSeasonsSchema,
  pulseScoreChampionsLeagueSeasonSchema,
  pulseScoreCompetitionHonoursSchema,
  pulseScoreAllTimeScorersSchema,
} from './types';

import { mapPulseScoreHistorySeason, mapPulseScoreChampionsLeagueSeason } from './adapters';

const API_BASE = 'http://localhost:4000/api';

function ensureOkResponse(response: Response, resourceName: string): void {
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resourceName}: ${response.status} ${response.statusText}`);
  }
}

export async function fetchPulseScoreHistorySeason(
  leagueCode: string,
  season: number
): Promise<PulseScoreHistorySeasonResponseSchema> {
  const response = await fetch(`${API_BASE}/competitions/${leagueCode}/seasons/${season}`);

  ensureOkResponse(response, 'pulse score history season');

  const json: unknown = await response.json();
  const data = pulseScoreHistorySeasonSchema.parse(json);

  return mapPulseScoreHistorySeason(data);
}

export async function fetchCompetitionSeasons(competitionCode: string): Promise<CompetitionSeasonsResponseSchema> {
  const response = await fetch(`${API_BASE}/competitions/${competitionCode}/seasons`);

  ensureOkResponse(response, 'competition seasons');

  const json: unknown = await response.json();
  return competitionSeasonsSchema.parse(json);
}

export async function fetchPulseScoreChampionsLeagueSeasons(): Promise<PulseScoreChampionsLeagueSeasonsResponseSchema> {
  const response = await fetch(`${API_BASE}/championsLeague/seasons`);

  ensureOkResponse(response, 'pulse score Champions League seasons');

  const json: unknown = await response.json();
  return pulseScoreChampionsLeagueSeasonsSchema.parse(json);
}

export async function fetchPulseScoreChampionsLeagueSeason(
  season: number
): Promise<PulseScoreChampionsLeagueSeasonResponseSchema> {
  const response = await fetch(`${API_BASE}/championsLeague/seasons/${season}`);

  ensureOkResponse(response, 'pulse score Champions League season');

  const json: unknown = await response.json();
  const data = pulseScoreChampionsLeagueSeasonSchema.parse(json);
  return mapPulseScoreChampionsLeagueSeason(data);
}

export async function fetchPulseScoreCompetitionHonours(
  competitionCode: string
): Promise<PulseScoreCompetitionHonoursResponseSchema> {
  const response = await fetch(`${API_BASE}/honours/${competitionCode}`);

  ensureOkResponse(response, 'competition honours');

  const json: unknown = await response.json();
  return pulseScoreCompetitionHonoursSchema.parse(json);
}

export async function fetchPulseScoreAllTimeScorers(
  competitionCode: string
): Promise<PulseScoreAllTimeScorersResponseSchema> {
  const response = await fetch(`${API_BASE}/records/${competitionCode}/all-time-scorers`);

  ensureOkResponse(response, 'all-time scorers');

  const json: unknown = await response.json();
  return pulseScoreAllTimeScorersSchema.parse(json);
}
