import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { fetchLeagueTeams } from '../../../api/footballDataApi';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useLeagueTeamsQuery() {
  const { mode, leagueCode, season } = useLeagueParams();

  const leagueTeamsQuery = useQuery({
    queryKey: queryKeys.teams(leagueCode, season),
    queryFn: () => fetchLeagueTeams(leagueCode),
    enabled: mode === 'league',
    placeholderData: (previousData) => previousData,
  });

  const teamsList = leagueTeamsQuery.data ?? [];

  return {
    leagueTeamsQuery,
    teamsList,
  };
}
