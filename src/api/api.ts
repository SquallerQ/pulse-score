import type {
  ListItemForRender,
  CompetitionsResponse,
  TableRow,
  TeamMatchApi,
  ChampionsLeagueMatchApi,
} from './types.ts';

const apiKey = import.meta.env.VITE_FOOTBALLDATA_KEY;

const API_BASE = '/api/v4';

const getAuthHeaders = () => ({
  'X-Auth-Token': apiKey,
});

export async function fetchAllLeagues() {
  const leagueList = [2072, 2224, 2081, 2088, 2114];
  const response = await fetch(`${API_BASE}/competitions/?areas=${leagueList}`, {
    headers: getAuthHeaders(),
  });
  const data: CompetitionsResponse = await response.json();
  console.log(data);
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

export async function fetchChampionsLeagueTeams() {
  const response = await fetch(`${API_BASE}/competitions/CL/teams`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  console.log(data);

  return {
    id: data.competition.id,
    // flag: data.area.flag,
    emblem: data.competition.emblem,
    name: data.competition.name,
    code: data.competition.code,
    teamsArray: data.teams.map((item: ListItemForRender) => ({
      logo: item.crest,
      name: item.shortName,
      id: item.id,
    })),
  };
}

export async function fetchLeagueTeams(leagueCode: string) {
  const response = await fetch(`${API_BASE}/competitions/${leagueCode}/teams`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  // console.log(data);

  return data.teams.map((item: ListItemForRender) => ({
    id: item.id,
    name: item.shortName,
    logo: item.crest,
    color: item.clubColors,
    leagueEmblem: data.competition.emblem,
    leagueName: data.competition.name,
  }));
}

export async function fetchTeamMatches(teamId: number) {
  const response = await fetch(`${API_BASE}/teams/${teamId}/matches`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error(`Matches request failed: ${response.status}`);
  const data = await response.json();
  // console.log(data);

  const competitions =
    typeof data?.resultSet?.competitions === 'string'
      ? data.resultSet.competitions.split(',').map((c: string) => c.trim())
      : [];

  const matches = (data.matches ?? []).map((match: TeamMatchApi) => ({
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
      currentMatchday: match.season.currentMatchday,
      endDate: match.season.endDate,
      id: match.season.id,
      startDate: match.season.startDate,
      winner: match.season.winner,
    },
    competition: {
      emblem: match.competition.emblem,
      name: match.competition.name,
    },
    stage: match.stage,
    status: match.status,
    utcDate: match.utcDate,
  }));

  return { matches, competitions };
}

export async function fetchLeagueTable(league: string) {
  const response = await fetch(`${API_BASE}/competitions/${league}/standings`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  return {
    competition: {
      id: data.competition.id,
      emblem: data.competition.emblem,
      code: data.competition.code,
      name: data.competition.name,
    },
    table: data.standings[0].table.map((item: TableRow) => ({
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
        name: item.team.name,
        crest: item.team.crest,
      },
    })),
  };
}

export async function fetchChampionsLeagueStages() {
  const stages = ['LAST_16', 'LAST_8', 'LAST_4', 'LAST_2'];

  const responses = await Promise.all(
    stages.map((stage) =>
      fetch(`${API_BASE}/competitions/CL/matches?stage=${stage}`, {
        headers: getAuthHeaders(),
      })
    )
  );

  const data = await Promise.all(responses.map((res) => res.json()));

  console.log(data);
  return data.map((stageData, index) => ({
    stage: stages[index],
    matches: stageData.matches.map((match: ChampionsLeagueMatchApi) => ({
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
  }));
}
