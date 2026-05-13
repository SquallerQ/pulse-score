import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { normalizeLeague, normalizeSeason, type LeagueCode } from './model';

type SetFiltersInput = {
  league?: LeagueCode;
  season?: string;
};

export function useLeagueParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const leagueCode = useMemo(() => normalizeLeague(searchParams.get('league')), [searchParams]);
  const season = useMemo(() => normalizeSeason(searchParams.get('season')), [searchParams]);

  useEffect(() => {
    const rawLeague = searchParams.get('league');
    const rawSeason = searchParams.get('season');

    if (rawLeague === leagueCode && rawSeason === season) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('league', leagueCode);
    nextParams.set('season', season);
    setSearchParams(nextParams, { replace: true });
  }, [leagueCode, season, searchParams, setSearchParams]);

  const setLeagueCode = useCallback(
    (nextLeague: LeagueCode) => {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('league', nextLeague);
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  const setSeason = useCallback(
    (nextSeason: string) => {
      const normalized = normalizeSeason(nextSeason);
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('season', normalized);
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  const setFilters = useCallback(
    ({ league, season: nextSeason }: SetFiltersInput) => {
      const nextParams = new URLSearchParams(searchParams);

      if (league) {
        nextParams.set('league', league);
      }
      if (typeof nextSeason === 'string') {
        nextParams.set('season', normalizeSeason(nextSeason));
      }

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    leagueCode,
    season,
    setLeagueCode,
    setSeason,
    setFilters,
  };
}
