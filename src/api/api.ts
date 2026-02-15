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

export async function fetchPremierLeagueTeams() {
  const response = await fetch(`${API_BASE}/competitions/PL/teams`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  return data.teams.map((item: ListItemForRender) => ({
    id: item.id,
    name: item.shortName,
    crest: item.crest,
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
