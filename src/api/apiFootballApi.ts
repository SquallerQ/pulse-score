const apiKey = import.meta.env.VITE_FOOTBALLDATA_KEY_API_FOOTBALL;

const API_BASE = 'https://v3.football.api-sports.io';

const getAuthHeaders = () => ({
  'x-rapidapi-key': apiKey,
  'x-rapidapi-host': 'v3.football.api-sports.io',
});

type TeamStanding = {
  rank: number;
  points: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
};

type LeagueInfo = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: TeamStanding[];
  championsHistory: {
    season: number;
    team: {
      id: number;
      name: string;
      logo: string;
    };
  }[];
};

type ApiFootballStandingItem = {
  rank: number;
  points: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
};

type ApiFootballLeagueSeason = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: ApiFootballStandingItem[][];
};

export type TopScorer = {
  id: number;
  name: string;
  photo: string;
  nationality: string;
  goals: number;
  assists: number;
  team: {
    name: string;
    logo: string;
  };
};

type ApiFootballPlayer = {
  player: {
    id: number;
    name: string;
    photo: string;
    nationality: string;
  };
  statistics: Array<{
    goals: {
      total: number;
      assists: number;
    };
    team: {
      name: string;
      logo: string;
    };
  }>;
};

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

type ChampionHistoryItem = LeagueInfo['championsHistory'][number];

function mapChampion(seasonLeague: ApiFootballLeagueSeason | null, season: number): ChampionHistoryItem | null {
  const champion = seasonLeague?.standings?.[0]?.[0];

  if (!champion) return null;

  return {
    season,
    team: {
      id: champion.team.id,
      name: champion.team.name,
      logo: champion.team.logo,
    },
  };
}

async function fetchLeagueSeasonStandings(leagueCode: string, season: number) {
  const league = API_FOOTBALL_LEAGUE_IDS[leagueCode];

  if (!league) return null;

  const response = await fetch(`${API_BASE}/standings?league=${league}&season=${season}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  return (data?.response?.[0]?.league ?? null) as ApiFootballLeagueSeason | null;
}

export async function fetchRecentChampions(leagueCode: string, count = 3) {
  const previousSeasonYear = getPreviousSeasonYear();
  const seasons = Array.from({ length: count }, (_, index) => previousSeasonYear - index);

  const data = await Promise.all(seasons.map((season) => fetchLeagueSeasonStandings(leagueCode, season)));

  const leagueData = data[0];
  if (!leagueData) return null;

  const championsHistory = data
    .map((seasonLeague, index) => mapChampion(seasonLeague, seasons[index]))
    .filter((item): item is ChampionHistoryItem => item !== null);

  return {
    id: leagueData.id,
    name: leagueData.name,
    country: leagueData.country,
    logo: leagueData.logo,
    flag: leagueData.flag,
    season: leagueData.season,
    standings: leagueData.standings[0].slice(0, 3).map((item: ApiFootballStandingItem) => ({
      rank: item.rank,
      points: item.points,
      team: {
        id: item.team.id,
        name: item.team.name,
        logo: item.team.logo,
      },
    })),
    championsHistory,
  } as LeagueInfo;
}

export async function fetchSeasonChampion(leagueCode: string, season = getPreviousSeasonYear()) {
  const seasonLeague = await fetchLeagueSeasonStandings(leagueCode, season);

  if (!seasonLeague) return null;

  const champion = mapChampion(seasonLeague, season);
  if (!champion) return null;

  return {
    id: seasonLeague.id,
    name: seasonLeague.name,
    country: seasonLeague.country,
    logo: seasonLeague.logo,
    flag: seasonLeague.flag,
    season: seasonLeague.season,
    standings: seasonLeague.standings[0].slice(0, 3).map((item: ApiFootballStandingItem) => ({
      rank: item.rank,
      points: item.points,
      team: {
        id: item.team.id,
        name: item.team.name,
        logo: item.team.logo,
      },
    })),
    championsHistory: [champion],
  } as LeagueInfo;
}

export async function fetchTopScorers(_league: string, season = getPreviousSeasonYear()) {
  const league = API_FOOTBALL_LEAGUE_IDS[_league];
  if (!league) return null;

  const response = await fetch(`${API_BASE}/players/topscorers?league=${league}&season=${season}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  return data.response.map(
    (item: ApiFootballPlayer): TopScorer => ({
      id: item.player.id,
      name: item.player.name,
      photo: item.player.photo,
      nationality: item.player.nationality,
      goals: item.statistics[0].goals.total,
      assists: item.statistics[0].goals.assists,
      team: {
        name: item.statistics[0].team.name,
        logo: item.statistics[0].team.logo,
      },
    })
  );
}

export async function championsLeagueWinner(leagueCode: string, season: number) {
  const league = API_FOOTBALL_LEAGUE_IDS[leagueCode];

  if (!league) return null;

  const response = await fetch(`${API_BASE}/fixtures?league=${league}&season=${season}&round=Final`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();

  const match = data.response[0];
  const winner = match.teams.away.winner ? match.teams.away : match.teams.home;
  const loser = match.teams.away.winner ? match.teams.home : match.teams.away;

  return {
    winnerLogo: winner.logo,
    winnerName: winner.name,
    loserLogo: loser.logo,
    loserName: loser.name,
  };
}
