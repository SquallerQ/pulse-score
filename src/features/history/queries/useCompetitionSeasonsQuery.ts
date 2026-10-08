import { useQuery } from '@tanstack/react-query';
import { fetchCompetitionSeasons, fetchPulseScoreChampionsLeagueSeasons } from '../../../api/pulse-score/client';
import { useLeagueParams } from '../../filters/useLeagueParams';
import { queryKeys } from '../../../lib/react-query/queryKeys';

export function useCompetitionSeasonsQuery() {
  const { leagueCode } = useLeagueParams();
  const isChampionsLeague = leagueCode === 'CL';

  const competitionSeasonsQuery = useQuery({
    queryKey: isChampionsLeague
      ? queryKeys.pulseScoreChampionsLeagueSeasons()
      : queryKeys.competitionSeasons(leagueCode),
    queryFn: () => (isChampionsLeague ? fetchPulseScoreChampionsLeagueSeasons() : fetchCompetitionSeasons(leagueCode)),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const competitionSeasons = competitionSeasonsQuery.data?.seasons ?? [];

  return { competitionSeasons, competitionSeasonsQuery };
}
