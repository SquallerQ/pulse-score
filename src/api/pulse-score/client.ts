import type { CompetitionSeasonsResponseSchema, PulseScoreHistorySeasonResponseSchema } from './types';
import { competitionSeasonsSchema, pulseScoreHistorySeasonSchema } from './types';

import { mapPulseScoreHistorySeason } from './adapters';

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
