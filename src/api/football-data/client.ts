import { mapChampionsLeagueWinner } from './adapters';
import { championsLeagueWinnerApiResponseSchema, type ChampionsLeagueWinner } from './types';

const apiKey = import.meta.env.VITE_FOOTBALLDATA_KEY_API_FOOTBALL;

const API_BASE = 'https://v3.football.api-sports.io';

const getAuthHeaders = () => ({
  'x-rapidapi-key': apiKey,
  'x-rapidapi-host': 'v3.football.api-sports.io',
});

export const API_FOOTBALL_LEAGUE_IDS: Record<string, number> = {
  PL: 39, // Premier League
  PD: 140, // La Liga
  SA: 135, // Serie A
  BL1: 78, // Bundesliga
  FL1: 61, // Ligue 1
  CL: 2, // CL
};

export async function championsLeagueWinner(leagueCode: string, season: number): Promise<ChampionsLeagueWinner | null> {
  const league = API_FOOTBALL_LEAGUE_IDS[leagueCode];

  if (!league) return null;

  const response = await fetch(`${API_BASE}/fixtures?league=${league}&season=${season}&round=Final`, {
    headers: getAuthHeaders(),
  });

  const json: unknown = await response.json();
  const data = championsLeagueWinnerApiResponseSchema.parse(json);

  return mapChampionsLeagueWinner(data);
}
