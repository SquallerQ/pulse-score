import { useQuery } from '@tanstack/react-query';

import { fetchPulseScoreChampionsLeagueSeason } from '../../../api/pulse-score/client';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function usePulseScoreChampionsLeagueSeasonQuery() {
  const { leagueCode, mode, season } = useLeagueParams();

  const pulseScoreChampionsLeagueSeasonQuery = useQuery({
    queryKey: queryKeys.pulseScoreChampionsLeagueSeason(season),
    queryFn: () => fetchPulseScoreChampionsLeagueSeason(Number(season)),
    enabled: leagueCode === 'CL' && mode === 'cup',
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    pulseScoreChampionsLeagueData: pulseScoreChampionsLeagueSeasonQuery.data,
    pulseScoreChampionsLeagueSeasonQuery,
  };
}
