import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../api/queryKeys';
import { championsLeagueTable } from '../../../api/footballDataApi';
import { useLeagueParams } from '../../filters/useLeagueParams';

export function useChampionsLeagueTableQuery() {
  const { mode } = useLeagueParams();

  const championsLeagueTableQuery = useQuery({
    queryKey: queryKeys.championsLeagueTable(),
    queryFn: () => championsLeagueTable(),
    enabled: mode === 'cup',
    placeholderData: (previousData) => previousData,
  });

  return {
    championsLeagueTableQuery,
  };
}
