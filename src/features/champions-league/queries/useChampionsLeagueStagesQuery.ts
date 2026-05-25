import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { fetchChampionsLeagueStages } from '../../../api/footballDataApi';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useChampionsLeagueStagesQuery() {
  const { mode } = useLeagueParams();

  const championsLeagueStagesQuery = useQuery({
    queryKey: queryKeys.championsLeagueMatches(),
    queryFn: () => fetchChampionsLeagueStages(),
    enabled: mode === 'cup',
    placeholderData: (previousData) => previousData,
  });

  const championsLeagueStages = championsLeagueStagesQuery.data ?? [];

  return {
    championsLeagueStages,
    championsLeagueStagesQuery,
  };
}
