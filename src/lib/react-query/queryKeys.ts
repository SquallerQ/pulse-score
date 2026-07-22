export const queryKeys = {
  leagues: (scope: string) => ['leagues', scope] as const,
  teams: (leagueCode: string, season: string) => ['teams', leagueCode, season] as const,
  teamMatches: (leagueCode: string, teamId: number) => ['teamMatches', leagueCode, teamId] as const,
  championsLeagueTeams: () => ['championsLeagueTeams'] as const,
  championsLeagueMatches: () => ['championsLeagueMatches'] as const,
  championsLeagueTable: () => ['championsLeagueTable'] as const,
  championsLeagueWinner: (leagueCode: string, season: string) => ['championsLeagueWinner', leagueCode, season] as const,
  leagueTable: (leagueCode: string) => ['leagueTable', leagueCode] as const,
  leagueSeasonsChampions: (leagueCode: string) => ['leagueSeasonsChampions', leagueCode] as const,
  leagueSeasonChampion: (leagueCode: string, season: string) => ['leagueSeasonChampion', leagueCode, season] as const,
  leagueInfoTopScorers: (leagueCode: string, season: string) => ['leagueInfoTopScorers', leagueCode, season] as const,

  epl2019: () => [] as const,
};
