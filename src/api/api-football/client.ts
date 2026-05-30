import { mapChampion, mapLeagueInfo, mapTopScorers, mapChampionsLeagueWinner } from './adapters';
import {
  leagueSeasonStandingsSchema,
  topScorersApiResponseSchema,
  championsLeagueWinnerApiResponseSchema,
  type LeagueSeasonStandings,
  type TopScorer,
  type ChampionsLeagueWinner,
  type ChampionHistoryItem,
  type LeagueInfo,
} from './types';

const apiKey = import.meta.env.VITE_FOOTBALLDATA_KEY_API_FOOTBALL;

const API_BASE = 'https://v3.football.api-sports.io';

const getAuthHeaders = () => ({
  'x-rapidapi-key': apiKey,
  'x-rapidapi-host': 'v3.football.api-sports.io',
});

function ensureOkResponse(response: Response, resourceName: string): void {
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resourceName}: ${response.status} ${response.statusText}`);
  }
}

export const API_FOOTBALL_LEAGUE_IDS: Record<string, number> = {
  PL: 39, // Premier League
  PD: 140, // La Liga
  SA: 135, // Serie A
  BL1: 78, // Bundesliga
  FL1: 61, // Ligue 1
  CL: 2, // CL
};

export function getPreviousSeasonYear() {
  return new Date().getFullYear() - 2;
}

async function fetchLeagueSeasonStandings(leagueCode: string, season: number): Promise<LeagueSeasonStandings | null> {
  const league = API_FOOTBALL_LEAGUE_IDS[leagueCode];

  if (!league) return null;

  const response = await fetch(`${API_BASE}/standings?league=${league}&season=${season}`, {
    headers: getAuthHeaders(),
  });
  ensureOkResponse(response, 'league season standings');

  const json: unknown = await response.json();
  const data = leagueSeasonStandingsSchema.parse(json);

  return data?.response?.[0]?.league ?? null;
}

export async function fetchRecentChampions(leagueCode: string, count = 3): Promise<LeagueInfo | null> {
  const current = getPreviousSeasonYear();

  const seasons = Array.from({ length: count }, (_, index) => current - index);

  const leagues = await Promise.all(seasons.map((season) => fetchLeagueSeasonStandings(leagueCode, season)));

  const latestLeague = leagues[0];
  if (!latestLeague) return null;

  const championsHistory = leagues
    .map((league) => mapChampion(league))
    .filter((item): item is ChampionHistoryItem => item !== null);

  return mapLeagueInfo(latestLeague, championsHistory);
}

export async function fetchSeasonChampion(leagueCode: string, season: number): Promise<LeagueInfo | null> {
  const league = await fetchLeagueSeasonStandings(leagueCode, season);
  if (!league) return null;

  const champion = mapChampion(league);
  const championsHistory = champion ? [champion] : [];

  return mapLeagueInfo(league, championsHistory);
}

export async function fetchTopScorers(
  leagueCode: string,
  season = getPreviousSeasonYear()
): Promise<TopScorer[] | null> {
  const league = API_FOOTBALL_LEAGUE_IDS[leagueCode];

  if (!league) return null;

  const response = await fetch(`${API_BASE}/players/topscorers?league=${league}&season=${season}`, {
    headers: getAuthHeaders(),
  });
  ensureOkResponse(response, 'top scorers');

  const json: unknown = await response.json();
  const data = topScorersApiResponseSchema.parse(json);

  return mapTopScorers(data);
}

export async function championsLeagueWinner(leagueCode: string, season: number): Promise<ChampionsLeagueWinner | null> {
  const league = API_FOOTBALL_LEAGUE_IDS[leagueCode];

  if (!league) return null;

  const response = await fetch(`${API_BASE}/fixtures?league=${league}&season=${season}&round=Final`, {
    headers: getAuthHeaders(),
  });
  ensureOkResponse(response, 'Champions League final');

  const json: unknown = await response.json();
  const data = championsLeagueWinnerApiResponseSchema.parse(json);

  return mapChampionsLeagueWinner(data);
}
