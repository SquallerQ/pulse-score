import type { ChampionsLeagueWinner, ChampionsLeagueWinnerApiResponse } from './types';

export function mapChampionsLeagueWinner(data: ChampionsLeagueWinnerApiResponse): ChampionsLeagueWinner | null {
  const match = data.response[0];

  if (!match) return null;

  const winner = match.teams.away.winner ? match.teams.away : match.teams.home;
  const loser = match.teams.away.winner ? match.teams.home : match.teams.away;

  return {
    winnerLogo: winner.logo,
    winnerName: winner.name,
    loserLogo: loser.logo,
    loserName: loser.name,
  };
}
