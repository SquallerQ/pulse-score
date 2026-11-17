import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';

import { useLeagueParams } from '../../../features/filters/useLeagueParams';

import { fetchPulseScoreHistorySeason } from '../../../api/pulse-score/client';

type SeasonMode = 'selected' | 'current';

type UsePulseScoreHistorySeasonQueryOptions = {
  seasonMode?: SeasonMode;
};

function getCurrentSeasonYear(): string {
  return String(new Date().getFullYear());
}

export function usePulseScoreHistorySeasonQuery({
  seasonMode = 'selected',
}: UsePulseScoreHistorySeasonQueryOptions = {}) {
  const { leagueCode, season } = useLeagueParams();
  const seasonToFetch = seasonMode === 'current' ? getCurrentSeasonYear() : season;

  const pulseScoreHistorySeasonQuery = useQuery({
    queryKey: queryKeys.pulseScoreHistorySeason(leagueCode, seasonToFetch),
    queryFn: () => fetchPulseScoreHistorySeason(leagueCode, +seasonToFetch),
    enabled: leagueCode !== 'CL',
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const pulseScoreHistoryData = pulseScoreHistorySeasonQuery.data;

  return { pulseScoreHistoryData, pulseScoreHistorySeasonQuery };
}
