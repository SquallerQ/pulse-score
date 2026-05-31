import {
  allLeaguesResponseSchema,
  championsLeagueTeamsResponseSchema,
  leagueTeamsResponseSchema,
  teamMatchesResponseSchema,
  leagueTableResponseSchema,
  championsLeagueStageResponseSchema,
  type ChampionsLeagueTeams,
  type TeamMatchesResult,
  type LeagueListItem,
  type LeagueTeamItem,
  type LeagueTable,
  type ChampionsLeagueStage,
} from './types';
import {
  mapLeagueList,
  mapChampionsLeagueTeams,
  mapLeagueTeams,
  mapTeamMatches,
  mapLeagueTable,
  mapChampionsLeagueStage,
} from './adapters';

const apiKey = import.meta.env.VITE_FOOTBALLDATA_KEY;

const API_BASE = '/api/v4';

const getAuthHeaders = () => ({
  'X-Auth-Token': apiKey,
});

function ensureOkResponse(response: Response, resourceName: string): void {
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resourceName}: ${response.status} ${response.statusText}`);
  }
}

export async function fetchAllLeagues(): Promise<LeagueListItem[]> {
  const leagueList = [2072, 2224, 2081, 2088, 2114];
  const areas = leagueList.join(',');

  const response = await fetch(`${API_BASE}/competitions/?areas=${areas}`, {
    headers: getAuthHeaders(),
  });

  ensureOkResponse(response, 'league list');

  const json: unknown = await response.json();
  const data = allLeaguesResponseSchema.parse(json);

  return mapLeagueList(data);
}

export async function fetchChampionsLeagueTeams(): Promise<ChampionsLeagueTeams> {
  const response = await fetch(`${API_BASE}/competitions/CL/teams`, {
    headers: getAuthHeaders(),
  });

  ensureOkResponse(response, 'Champions League teams');

  const json: unknown = await response.json();
  const data = championsLeagueTeamsResponseSchema.parse(json);

  return mapChampionsLeagueTeams(data);
}

export async function fetchLeagueTeams(leagueCode: string): Promise<LeagueTeamItem[]> {
  const response = await fetch(`${API_BASE}/competitions/${leagueCode}/teams`, {
    headers: getAuthHeaders(),
  });
  ensureOkResponse(response, 'league teams');

  const json: unknown = await response.json();
  const data = leagueTeamsResponseSchema.parse(json);

  return mapLeagueTeams(data);
}

export async function fetchTeamMatches(teamId: number): Promise<TeamMatchesResult> {
  const response = await fetch(`${API_BASE}/teams/${teamId}/matches`, {
    headers: getAuthHeaders(),
  });
  ensureOkResponse(response, 'teams matches');

  const json: unknown = await response.json();
  const data = teamMatchesResponseSchema.parse(json);

  return mapTeamMatches(data);
}

export async function fetchLeagueTable(leagueCode: string): Promise<LeagueTable> {
  const response = await fetch(`${API_BASE}/competitions/${leagueCode}/standings`, {
    headers: getAuthHeaders(),
  });
  ensureOkResponse(response, 'league table');

  const json: unknown = await response.json();
  const data = leagueTableResponseSchema.parse(json);
  return mapLeagueTable(data);
}

export async function fetchChampionsLeagueTable(): Promise<LeagueTable> {
  const response = await fetch(`${API_BASE}/competitions/CL/standings`, {
    headers: getAuthHeaders(),
  });
  ensureOkResponse(response, 'Champions League table');

  const json: unknown = await response.json();
  const data = leagueTableResponseSchema.parse(json);

  return mapLeagueTable(data);
}

export async function fetchChampionsLeagueStages(): Promise<ChampionsLeagueStage[]> {
  const stages: ChampionsLeagueStage['stage'][] = ['PLAYOFFS', 'LAST_16', 'QUARTER_FINALS', 'SEMI_FINALS', 'FINAL'];

  const responses = await Promise.all(
    stages.map((stage) =>
      fetch(`${API_BASE}/competitions/CL/matches?stage=${stage}`, {
        headers: getAuthHeaders(),
      })
    )
  );

  const results: ChampionsLeagueStage[] = [];

  for (let i = 0; i < responses.length; i++) {
    if (!responses[i].ok) {
      if (responses[i].status === 429) {
        throw new Error(
          `Failed to fetch Champions League ${stages[i]} matches: ${responses[i].status} ${responses[i].statusText}`
        );
      }
      continue;
    }

    const json: unknown = await responses[i].json();
    const parsed = championsLeagueStageResponseSchema.safeParse(json);

    if (!parsed.success) continue;

    results.push(mapChampionsLeagueStage(parsed.data, stages[i]));
  }

  return results;
}
