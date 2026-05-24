import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { fetchSeasonChampion } from '../../../api/apiFootballApi';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useSeasonChampionQuery() {
  const { leagueCode, season } = useLeagueParams();

  const seasonChampionQuery = useQuery({
    queryKey: queryKeys.leagueSeasonChampion(leagueCode, season),
    queryFn: () => fetchSeasonChampion(leagueCode, +season),
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { seasonChampionQuery };
}
