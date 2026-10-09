import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import { fetchChampionsLeagueTable } from '../../../api/football-data/client';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useChampionsLeagueTableQuery(enabledOverride?: boolean) {
  const { mode } = useLeagueParams();
  const isEnabled = enabledOverride ?? mode === 'cup';

  const championsLeagueTableQuery = useQuery({
    queryKey: queryKeys.championsLeagueTable(),
    queryFn: fetchChampionsLeagueTable,
    enabled: isEnabled,
    placeholderData: (previousData) => previousData,
  });
  const championsLeagueTable = championsLeagueTableQuery.data ?? null;

  return {
    championsLeagueTable,
    championsLeagueTableQuery,
  };
}
