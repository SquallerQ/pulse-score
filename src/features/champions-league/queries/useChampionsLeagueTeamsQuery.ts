import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { fetchChampionsLeagueTeams } from '../../../api/footballDataApi';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useChampionsLeagueTeamsQuery() {
  const { mode } = useLeagueParams();

  const championsLeagueTeamsQuery = useQuery({
    queryKey: queryKeys.championsLeagueTeams(),
    queryFn: () => fetchChampionsLeagueTeams(),
    enabled: mode === 'cup',
    placeholderData: (previousData) => previousData,
  });
  const championsLeagueTeams = championsLeagueTeamsQuery.data?.teamsArray ?? [];

  return {
    championsLeagueTeams,
    championsLeagueTeamsQuery,
  };
}
