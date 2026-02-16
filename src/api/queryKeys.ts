export const queryKeys = {
  teams: (leagueCode: string, season: string) => ['teams', leagueCode, season] as const,
  teamMatches: (leagueCode: string, teamId: number) => ['teamMatches', leagueCode, teamId] as const,
};
