import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/react-query/queryKeys';
import { fetchLeagueTable } from '../../../api/football-data/client';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useLeagueTableQuery() {
  const { mode, leagueCode } = useLeagueParams();

  const leagueTableQuery = useQuery({
    queryKey: queryKeys.leagueTable(leagueCode),
    queryFn: () => fetchLeagueTable(leagueCode),
    enabled: mode === 'league',
    placeholderData: (previousData) => previousData,
  });

  const leagueTable = leagueTableQuery.data ?? null;

  return {
    leagueTableQuery,
    leagueTable,
  };
}
