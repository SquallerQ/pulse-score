import { useQuery } from '@tanstack/react-query';
import { fetchPulseScoreAllTimeScorers } from '../../../api/pulse-score/client';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useCompetitionAllTimeScorersQuery() {
  const { leagueCode } = useLeagueParams();

  const allTimeScorersQuery = useQuery({
    queryKey: queryKeys.pulseScoreAllTimeScorers(leagueCode),
    queryFn: () => fetchPulseScoreAllTimeScorers(leagueCode),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { allTimeScorersQuery };
}
