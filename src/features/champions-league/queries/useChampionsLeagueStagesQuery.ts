import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { fetchChampionsLeagueStages } from '../../../api/football-data/client';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useChampionsLeagueStagesQuery(enabledOverride?: boolean) {
  const { mode } = useLeagueParams();
  const isEnabled = enabledOverride ?? mode === 'cup';

  const championsLeagueStagesQuery = useQuery({
    queryKey: queryKeys.championsLeagueMatches(),
    queryFn: () => fetchChampionsLeagueStages(),
    enabled: isEnabled,
    placeholderData: (previousData) => previousData,
  });

  const championsLeagueStages = championsLeagueStagesQuery.data ?? [];

  return {
    championsLeagueStages,
    championsLeagueStagesQuery,
  };
}
