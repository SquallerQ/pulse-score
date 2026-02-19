export const queryKeys = {
  leagues: (league: string) => ['leagues', league] as const,
  teams: (leagueCode: string, season: string) => ['teams', leagueCode, season] as const,
  teamMatches: (leagueCode: string, teamId: number) => ['teamMatches', leagueCode, teamId] as const,
};
