import {
  type AllLeaguesResponse,
  type LeagueListItem,
  type ChampionsLeagueTeamsResponse,
  type ChampionsLeagueTeams,
  type LeagueTeamsResponse,
  type LeagueTeamItem,
  type TeamMatchesApiResponse,
  type TeamMatchesResult,
  type LeagueTableResponse,
  type LeagueTable,
  type ChampionsLeagueStageApiResponse,
  type ChampionsLeagueStage,
  type ChampionsLeagueStageName,
} from './types';

export function mapLeagueList(data: AllLeaguesResponse): LeagueListItem[] {
  return data.competitions
    .filter((item) => item.name !== 'Championship')
    .map((item) => ({
      id: item.area.id,
      flag: item.area.flag,
      country: item.area.name,
      emblem: item.emblem,
      name: item.name,
      code: item.code,
    }));
}

export function mapChampionsLeagueTeams(data: ChampionsLeagueTeamsResponse): ChampionsLeagueTeams {
  return {
    id: data.competition.id,
    emblem: data.competition.emblem,
    name: data.competition.name,
    code: data.competition.code,
    teamsArray: data.teams.map((item) => ({
      logo: item.crest,
      name: item.shortName,
      id: item.id,
    })),
  };
}

export function mapLeagueTeams(data: LeagueTeamsResponse): LeagueTeamItem[] {
  return data.teams.map((item) => ({
    id: item.id,
    name: item.shortName,
    logo: item.crest,
    color: item.clubColors,
    leagueEmblem: data.competition.emblem,
    leagueName: data.competition.name,
  }));
}

export function mapTeamMatches(data: TeamMatchesApiResponse): TeamMatchesResult {
  const competitions = data.resultSet.competitions
    ? data.resultSet.competitions.split(',').map((competition) => competition.trim())
    : [];

  const matches = data.matches.map((match) => ({
    id: match.id,
    homeTeam: {
      id: match.homeTeam.id,
      crest: match.homeTeam.crest,
      name: match.homeTeam.shortName,
      shortName: match.homeTeam.shortName,
      tla: match.homeTeam.tla,
    },
    awayTeam: {
      id: match.awayTeam.id,
      crest: match.awayTeam.crest,
      name: match.awayTeam.shortName,
      shortName: match.awayTeam.shortName,
      tla: match.awayTeam.tla,
    },
    score: {
      home: match.score.fullTime.home,
      away: match.score.fullTime.away,
      winner: match.score.winner,
      duration: match.score.duration,
    },
    season: {
      id: match.season.id,
      currentMatchday: match.season.currentMatchday,
      endDate: match.season.endDate,
      startDate: match.season.startDate,
      winner: match.season.winner,
    },
    competition: {
      emblem: match.competition.emblem,
      name: match.competition.name,
      code: match.competition.code,
    },
    stage: match.stage,
    status: match.status,
    utcDate: match.utcDate,
  }));
  return { matches, competitions };
}

export function mapLeagueTable(data: LeagueTableResponse): LeagueTable {
  const table = data.standings[0]?.table ?? [];

  return {
    competition: {
      id: data.competition.id,
      emblem: data.competition.emblem,
      code: data.competition.code,
      name: data.competition.name,
    },
    table: table.map((item) => ({
      position: item.position,
      playedGames: item.playedGames,
      won: item.won,
      draw: item.draw,
      lost: item.lost,
      points: item.points,
      goalsFor: item.goalsFor,
      goalsAgainst: item.goalsAgainst,
      goalDifference: item.goalDifference,
      team: {
        id: item.team.id,
        shortName: item.team.shortName,
        crest: item.team.crest,
      },
    })),
  };
}

export function mapChampionsLeagueStage(
  data: ChampionsLeagueStageApiResponse,
  stage: ChampionsLeagueStageName
): ChampionsLeagueStage {
  return {
    stage,
    matches: data.matches.map((match) => ({
      id: match.id,
      utcDate: match.utcDate,
      status: match.status,
      matchday: match.matchday,
      homeTeam: {
        id: match.homeTeam.id,
        name: match.homeTeam.shortName ?? match.homeTeam.name,
        crest: match.homeTeam.crest,
      },
      awayTeam: {
        id: match.awayTeam.id,
        name: match.awayTeam.shortName ?? match.awayTeam.name,
        crest: match.awayTeam.crest,
      },
      score: {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away,
        winner: match.score.winner,
      },
    })),
  };
}
