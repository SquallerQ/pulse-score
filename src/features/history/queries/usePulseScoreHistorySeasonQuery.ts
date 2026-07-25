import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';

import { useLeagueParams } from '../../../features/filters/useLeagueParams';

import { fetchPulseScoreHistorySeason } from '../../../api/pulse-score/client';

export function usePulseScoreHistorySeasonQuery() {
  const { leagueCode, season } = useLeagueParams();

  const seasonChampionQuery = useQuery({
    queryKey: queryKeys.pulseScoreHistorySeason(leagueCode, season),
    queryFn: () => fetchPulseScoreHistorySeason(leagueCode, +season),
    enabled: leagueCode !== 'CL',
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const seasonChampionQueryPS = seasonChampionQuery.data;
  return { seasonChampionQueryPS };
}
