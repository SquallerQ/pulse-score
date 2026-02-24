export const queryKeys = {
  leagues: (scope: string) => ['leagues', scope] as const,
  teams: (leagueCode: string, season: string) => ['teams', leagueCode, season] as const,
  teamMatches: (leagueCode: string, teamId: number) => ['teamMatches', leagueCode, teamId] as const,
  championsLeagueTeams: () => ['championsLeagueTeams'] as const,
  championsLeagueMatches: () => ['championsLeagueMatches'] as const,
};
