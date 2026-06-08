import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import { fetchChampionsLeagueTable } from '../../../api/football-data/client';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useChampionsLeagueTableQuery() {
  const { mode } = useLeagueParams();

  const championsLeagueTableQuery = useQuery({
    queryKey: queryKeys.championsLeagueTable(),
    queryFn: fetchChampionsLeagueTable,
    enabled: mode === 'cup',
    placeholderData: (previousData) => previousData,
  });
  const championsLeagueTable = championsLeagueTableQuery.data ?? null;

  return {
    championsLeagueTable,
    championsLeagueTableQuery,
  };
}
