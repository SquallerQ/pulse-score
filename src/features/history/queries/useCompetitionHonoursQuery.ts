import { useQuery } from '@tanstack/react-query';
import { fetchPulseScoreCompetitionHonours } from '../../../api/pulse-score/client';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useCompetitionHonoursQuery() {
  const { leagueCode } = useLeagueParams();

  const competitionHonoursQuery = useQuery({
    queryKey: queryKeys.pulseScoreCompetitionHonours(leagueCode),
    queryFn: () => fetchPulseScoreCompetitionHonours(leagueCode),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { competitionHonoursQuery };
}
