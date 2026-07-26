import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { seasonsArray } from '../../utils/generateSeasons';
import { normalizeSeason } from './model';
import { type HistoryTab, useHistoryPageTabsParams } from './useHistoryPageParams';
import { useLeagueParams } from './useLeagueParams';

const RECENT_SEASONS = seasonsArray.map(String);
const ARCHIVE_SEASONS = ['2008'];

function getAllowedSeasons(tab: HistoryTab): string[] {
  return tab === 'archive' ? ARCHIVE_SEASONS : RECENT_SEASONS;
}

function isSeasonAllowedForTab(tab: HistoryTab, season: string): boolean {
  return getAllowedSeasons(tab).includes(season);
}

function getFallbackSeason(tab: HistoryTab, currentSeason: string): string {
  const normalizedSeason = normalizeSeason(currentSeason);

  if (isSeasonAllowedForTab(tab, normalizedSeason)) {
    return normalizedSeason;
  }

  return getAllowedSeasons(tab)[0] ?? normalizedSeason;
}

export function useHistoryTabSelection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { season } = useLeagueParams();
  const { tab } = useHistoryPageTabsParams();

  useEffect(() => {
    if (isSeasonAllowedForTab(tab, season)) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('season', getFallbackSeason(tab, season));
    setSearchParams(nextParams, { replace: true });
  }, [tab, season, searchParams, setSearchParams]);

  const setHistoryTab = useCallback(
    (nextTab: HistoryTab) => {
      const nextParams = new URLSearchParams(searchParams);
      const nextSeason = getFallbackSeason(nextTab, season);

      nextParams.set('tab', nextTab);
      nextParams.set('season', nextSeason);
      setSearchParams(nextParams);
    },
    [searchParams, season, setSearchParams]
  );

  const selectRecentSeasonsTab = useCallback(() => {
    setHistoryTab('recent-seasons');
  }, [setHistoryTab]);

  const selectArchiveTab = useCallback(() => {
    setHistoryTab('archive');
  }, [setHistoryTab]);

  return {
    tab,
    isArchiveTab: tab === 'archive',
    isRecentSeasonsTab: tab === 'recent-seasons',
    selectRecentSeasonsTab,
    selectArchiveTab,
    setHistoryTab,
  };
}
