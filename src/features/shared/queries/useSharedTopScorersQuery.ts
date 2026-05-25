import { useQuery } from '@tanstack/react-query';
import { fetchTopScorers } from '../../../api/apiFootballApi';
import { queryKeys } from '../../../api/queryKeys';
import { useLeagueParams } from '../../filters/useLeagueParams';

type UseSharedTopScorersQueryOptions = {
  seasonOverride?: string;
};

export function useSharedTopScorersQuery(options?: UseSharedTopScorersQueryOptions) {
  const { leagueCode, season } = useLeagueParams();
  const querySeason = options?.seasonOverride ?? season;

  const leagueInfoTopScorersQuery = useQuery({
    queryKey: queryKeys.leagueInfoTopScorers(leagueCode, querySeason),
    queryFn: () => fetchTopScorers(leagueCode, +querySeason),
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
