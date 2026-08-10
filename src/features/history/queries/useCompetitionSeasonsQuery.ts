import { useQuery } from '@tanstack/react-query';
import { fetchCompetitionSeasons } from '../../../api/pulse-score/client';
import { useLeagueParams } from '../../filters/useLeagueParams';
import { queryKeys } from '../../../lib/react-query/queryKeys';

export function useCompetitionSeasonsQuery() {
  const { leagueCode } = useLeagueParams();

  const competitionSeasonsQuery = useQuery({
    queryKey: queryKeys.competitionSeasons(leagueCode),
    queryFn: () => fetchCompetitionSeasons(leagueCode),
    // enabled: leagueCode !== 'CL',
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const competitionSeasons = competitionSeasonsQuery.data?.seasons ?? [];

  return { competitionSeasons, competitionSeasonsQuery };
}
