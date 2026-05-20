import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { fetchSeasonChampion } from '../../../api/apiFootballApi';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useSeasonChampionQuery() {
  const { leagueCode, season, mode } = useLeagueParams();

  const seasonChampionQuery = useQuery({
    queryKey: queryKeys.leagueSeasonChampion(leagueCode, season),
    queryFn: () => fetchSeasonChampion(leagueCode, +season),
    enabled: mode === 'league',
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
  });

  return { seasonChampionQuery };
}
