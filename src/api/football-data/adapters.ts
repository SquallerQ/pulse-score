import type {
  ChampionsLeagueWinner,
  ChampionsLeagueWinnerApiResponse,
  TopScorersApiResponse,
  TopScorer,
  LeagueSeasonStandings,
  ChampionHistoryItem,
} from './types';

export function mapChampion(league: LeagueSeasonStandings | null): ChampionHistoryItem | null {
  if (!league) return null;

  const champion = league.standings[0]?.[0];
  if (!champion) return null;

  return {
    season: league.season,
    team: {
      id: champion.team.id,
      name: champion.team.name,
      logo: champion.team.logo,
    },
  };
}

export function mapTopScorers(data: TopScorersApiResponse): TopScorer[] {
  return data.response.map((item) => ({
    id: item.player.id,
    name: item.player.name,
    photo: item.player.photo,
    nationality: item.player.nationality,
    goals: item.statistics[0]?.goals.total ?? null,
    assists: item.statistics[0]?.goals.assists ?? null,
    team: {
      name: item.statistics[0]?.team.name ?? '',
      logo: item.statistics[0]?.team.logo ?? '',
    },
  }));
}

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
