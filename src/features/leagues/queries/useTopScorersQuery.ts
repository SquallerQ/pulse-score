import { useQuery } from '@tanstack/react-query';
import { fetchTopScorers } from '../../../api/apiFootballApi';
import { queryKeys } from '../../../api/queryKeys';
import { useLeagueParams } from '../../filters/useLeagueParams';

type UseTopScorersQueryOptions = {
  seasonOverride?: string;
};

export function useTopScorersQuery(options?: UseTopScorersQueryOptions) {
  const { leagueCode, mode, season } = useLeagueParams();
  const querySeason = options?.seasonOverride ?? season;

  const leagueInfoTopScorersQuery = useQuery({
    queryKey: queryKeys.leagueInfoTopScorers(leagueCode, querySeason),
    queryFn: () => fetchTopScorers(leagueCode, +querySeason),
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
