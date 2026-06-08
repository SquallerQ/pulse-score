import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import { fetchSeasonChampion } from '../../../api/api-football/client';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useSeasonChampionQuery() {
  const { leagueCode, season } = useLeagueParams();

  const seasonChampionQuery = useQuery({
    queryKey: queryKeys.leagueSeasonChampion(leagueCode, season),
    queryFn: () => fetchSeasonChampion(leagueCode, +season),
    enabled: leagueCode !== 'CL',
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { seasonChampionQuery };
}
