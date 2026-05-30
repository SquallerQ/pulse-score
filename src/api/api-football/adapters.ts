import type {
  ChampionsLeagueWinner,
  ChampionsLeagueWinnerApiResponse,
  TopScorersApiResponse,
  TopScorer,
  LeagueSeasonStandings,
  ChampionHistoryItem,
  LeagueInfo,
  TeamStanding,
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

export function mapTopThreeStandings(league: LeagueSeasonStandings): TeamStanding[] {
  return (league.standings[0] ?? []).slice(0, 3).map((item) => ({
    rank: item.rank,
    points: item.points,
    team: {
      id: item.team.id,
      name: item.team.name,
      logo: item.team.logo,
    },
  }));
}

export function mapLeagueInfo(league: LeagueSeasonStandings, championsHistory: ChampionHistoryItem[]): LeagueInfo {
  return {
    id: league.id,
    name: league.name,
    country: league.country,
    logo: league.logo,
    flag: league.flag,
    season: league.season,
    standings: mapTopThreeStandings(league),
    championsHistory,
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
