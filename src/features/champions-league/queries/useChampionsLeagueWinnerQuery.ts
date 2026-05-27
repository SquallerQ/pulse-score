import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { championsLeagueWinner } from '../../../api/football-data/client';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useChampionsLeagueWinnerQuery() {
  const { leagueCode, season } = useLeagueParams();

  const CLFinalQuery = useQuery({
    queryKey: queryKeys.championsLeagueWinner(leagueCode, season),
    queryFn: () => championsLeagueWinner(leagueCode, +season),
    placeholderData: (previousData) => previousData,
    enabled: leagueCode === 'CL',
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const CLFinalWinner = {
    name: CLFinalQuery.data?.winnerName,
    logo: CLFinalQuery.data?.winnerLogo,
  };

  const CLFinalLoser = {
    name: CLFinalQuery.data?.loserName,
    logo: CLFinalQuery.data?.loserLogo,
  };

  return { CLFinalWinner, CLFinalLoser, CLFinalQuery };
}
