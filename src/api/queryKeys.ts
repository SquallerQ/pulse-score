export const queryKeys = {
  teams: (leagueCode: string, season: string) => ['teams', leagueCode, season] as const,
  teamMatches: (teamId: number) => ['teamMatches', teamId] as const,
};
