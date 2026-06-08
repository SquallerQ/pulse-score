import { useQuery } from '@tanstack/react-query';
import { fetchTeamMatches } from '../../../api/football-data/client';
import { queryKeys } from '../../../lib/react-query/queryKeys';

export function useTeamMatchesQuery(leagueCode?: string, teamId?: number) {
  const teamMatchesQuery = useQuery({
    queryKey: queryKeys.teamMatches(leagueCode ?? '', teamId ?? 0),
    queryFn: () => fetchTeamMatches(teamId!),
    enabled: typeof teamId === 'number',
  });

  return {
    teamMatches: teamMatchesQuery.data ?? null,
    teamMatchesQuery,
  };
}
