const apiKey = import.meta.env.VITE_FOOTBALLDATA_KEY;

const API_BASE = '/api/v4';

const getAuthHeaders = () => ({
  'X-Auth-Token': apiKey,
});

type ListItemForRender = {
  id: number;
  shortName: string;
  crest: string;
};

type CompetitionItem = {
  area: {
    id: number;
    flag: string;
    name: string;
  };
  emblem: string;
  name: string;
  code: string;
};

type CompetitionsResponse = {
  competitions: CompetitionItem[];
};

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

// export async function fetchChampionsLeague() {
//   const response = await fetch(`${API_BASE}/competitions/CL`);
//   const data = await response.json();
//   console.log(data);
// }

export async function fetchLeagueTeams(leagueCode: string) {
  const response = await fetch(`${API_BASE}/competitions/${leagueCode}/teams`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  return data.teams.map((item: ListItemForRender) => ({
    id: item.id,
    name: item.shortName,
    logo: item.crest,
  }));
}

export async function fetchTeamMatches(teamId: number) {
  const res = await fetch(`${API_BASE}/teams/${teamId}/matches`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Matches request failed: ${res.status}`);
  const data = await res.json();
  return data.matches ?? [];
}
