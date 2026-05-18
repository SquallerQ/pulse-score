import { useQuery } from '@tanstack/react-query';
import { fetchTopScorers } from '../../../api/apiFootballApi';
import { queryKeys } from '../../../api/queryKeys';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useTopScorersQuery() {
  const { leagueCode, mode } = useLeagueParams();

  const leagueInfoTopScorersQuery = useQuery({
    queryKey: queryKeys.leagueInfoTopScorers(leagueCode),
    queryFn: () => fetchTopScorers(leagueCode),
    enabled: mode === 'league',
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    leagueInfoTopScorersQuery,
  };
}
