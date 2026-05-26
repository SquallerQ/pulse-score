import { useQuery } from '@tanstack/react-query';
import { fetchTeamMatches } from '../../../api/footballDataApi';
import { queryKeys } from '../../../api/queryKeys';
import type { TeamMatchesResponse } from '../../../api/types';

export function useTeamMatchesQuery(leagueCode?: string, teamId?: number) {
  const teamMatchesQuery = useQuery<TeamMatchesResponse>({
    queryKey: queryKeys.teamMatches(leagueCode ?? '', teamId ?? 0),
    queryFn: () => fetchTeamMatches(teamId!),
    enabled: typeof teamId === 'number',
  });

  return {
    teamMatches: teamMatchesQuery.data ?? null,
    teamMatchesQuery,
  };
}
