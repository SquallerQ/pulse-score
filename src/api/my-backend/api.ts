//Test

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../lib/react-query/queryKeys';

export async function top3epl2019() {
  const response = await fetch('http://localhost:4000/api/top3');
  const data = await response.json();
  console.log(data.epl2019.places);
  return data.epl2019.places;
}

export function useTop3epl2019Query() {
  const championsLeagueStagesQuery = useQuery({
    queryKey: queryKeys.epl2019(),
    queryFn: () => top3epl2019(),
  });
  console.log(championsLeagueStagesQuery);

  const data = championsLeagueStagesQuery.data;
  return { data };
}

//Test
