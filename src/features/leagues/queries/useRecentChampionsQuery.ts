import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { fetchRecentChampions } from '../../../api/apiFootballApi';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useRecentChampionsQuery(count = 3) {
  const { leagueCode, mode } = useLeagueParams();

  const leagueInfoQuery = useQuery({
    queryKey: queryKeys.leagueSeasonsChampions(leagueCode),
    queryFn: () => fetchRecentChampions(leagueCode, count),
    enabled: mode === 'league',
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { leagueInfoQuery };
}
