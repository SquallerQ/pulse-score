import { useQuery } from '@tanstack/react-query';
import { fetchAllLeagues } from '../../../api/footballDataApi';
import { queryKeys } from '../../../api/queryKeys';
import { useMemo } from 'react';

type League = {
  id: number;
  flag: string;
  country: string;
  emblem: string;
  name: string;
  code: string;
};

export function useLeagues(leagueCode: string) {
  const leaguesQuery = useQuery({
    queryKey: queryKeys.leagues('all'),
    queryFn: fetchAllLeagues,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const EMPTY_LEAGUES: League[] = [];

  const leagues = leaguesQuery.data ?? EMPTY_LEAGUES;

  const currentLeague = useMemo(
    () => leagues.find((league) => league.code === leagueCode) ?? leagues[0] ?? null,
    [leagues, leagueCode]
  );

  return {
    leaguesQuery,
    leagues,
    currentLeague,
  };
}
