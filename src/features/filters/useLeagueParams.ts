import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { normalizeLeague, normalizeMode, normalizeSeason } from './model';

type SetFiltersInput = {
  league?: string;
  season?: string;
  mode?: string;
};

export function useLeagueParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const leagueCode = useMemo(() => normalizeLeague(searchParams.get('league')), [searchParams]);
  const season = useMemo(() => normalizeSeason(searchParams.get('season')), [searchParams]);
  const mode = useMemo(() => normalizeMode(searchParams.get('mode')), [searchParams]);

  useEffect(() => {
    const rawLeague = searchParams.get('league');
    const rawSeason = searchParams.get('season');
    const rawMode = searchParams.get('mode');

    if (rawLeague === leagueCode && rawSeason === season && rawMode === mode) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('league', leagueCode);
    nextParams.set('season', season);
    nextParams.set('mode', mode);
    setSearchParams(nextParams, { replace: true });
  }, [leagueCode, season, mode, searchParams, setSearchParams]);

  const setLeagueCode = useCallback(
    (nextLeague: string) => {
      const normalized = normalizeLeague(nextLeague);
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('league', normalized);
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

  const setMode = useCallback(
    (nextMode: string) => {
      const normalized = normalizeMode(nextMode);
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('mode', normalized);
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  const setFilters = useCallback(
    ({ league, season: nextSeason, mode: nextMode }: SetFiltersInput) => {
      const nextParams = new URLSearchParams(searchParams);

      if (league) {
        nextParams.set('league', normalizeLeague(league));
      }
      if (typeof nextSeason === 'string') {
        nextParams.set('season', normalizeSeason(nextSeason));
      }
      if (typeof nextMode === 'string') {
        nextParams.set('mode', normalizeMode(nextMode));
      }

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    leagueCode,
    season,
    mode,
    setLeagueCode,
    setSeason,
    setMode,
    setFilters,
  };
}
