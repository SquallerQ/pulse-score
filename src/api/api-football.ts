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

export const API_FOOTBALL_LEAGUE_IDS: Record<string, number> = {
  PL: 39, // Premier League
  PD: 140, // La Liga
  SA: 135, // Serie A
  BL1: 78, // Bundesliga
  FL1: 61, // Ligue 1
};

export async function fetchLastSeasonChampion(_league: string) {
  const league = API_FOOTBALL_LEAGUE_IDS[_league];

  if (!league) return null;

  const seasons = [2024, 2023, 2022];

  const responses = await Promise.all(
    seasons.map((season) =>
      fetch(`${API_BASE}/standings?league=${league}&season=${season}`, {
        headers: getAuthHeaders(),
      })
    )
  );

  const data = await Promise.all(responses.map((response) => response.json()));

  const leagueData = data[0]?.response[0]?.league;
  if (!leagueData) return null;

  const championsHistory = data
    .map((seasonData, index) => {
      const seasonLeague = seasonData.response[0]?.league;
      const champion = seasonLeague?.standings?.[0]?.[0];

      if (!champion) return null;

      return {
        season: seasons[index],
        team: {
          id: champion.team.id,
          name: champion.team.name,
          logo: champion.team.logo,
        },
      };
    })
    .filter(Boolean);

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
