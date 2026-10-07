import type {
  CompetitionSeasonsResponseSchema,
  PulseScoreHistorySeasonResponseSchema,
  PulseScoreChampionsLeagueSeasonsResponseSchema,
  PulseScoreChampionsLeagueSeasonResponseSchema,
} from './types';

import {
  competitionSeasonsSchema,
  pulseScoreHistorySeasonSchema,
  pulseScoreChampionsLeagueSeasonsSchema,
  pulseScoreChampionsLeagueSeasonSchema,
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
