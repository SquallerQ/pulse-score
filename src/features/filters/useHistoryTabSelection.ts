import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { seasonsArray } from '../../utils/generateSeasons';
import { normalizeSeason } from './model';
import { type HistoryTab, useHistoryPageTabsParams } from './useHistoryPageParams';
import { useLeagueParams } from './useLeagueParams';
import { useCompetitionSeasonsQuery } from '../history/queries/useCompetitionSeasonsQuery';

const RECENT_SEASONS = seasonsArray.map(String);
const ARCHIVE_FALLBACK_SEASON = '2017';

function tabUsesSeason(tab: HistoryTab): boolean {
  return tab !== 'clubs-titles' && tab !== 'all-time-scorers';
}

function getAllowedSeasons(tab: HistoryTab, archiveSeasons: string[]): string[] {
  if (tab === 'archive') {
    return archiveSeasons.length > 0 ? archiveSeasons : [ARCHIVE_FALLBACK_SEASON];
  }

  return RECENT_SEASONS;
}

function isSeasonAllowedForTab(tab: HistoryTab, season: string, archiveSeasons: string[]): boolean {
  return getAllowedSeasons(tab, archiveSeasons).includes(season);
}

function getFallbackSeason(tab: HistoryTab, currentSeason: string, archiveSeasons: string[]): string {
  const normalizedSeason = normalizeSeason(currentSeason);

  if (isSeasonAllowedForTab(tab, normalizedSeason, archiveSeasons)) {
    return normalizedSeason;
  }

  const allowedSeasons = getAllowedSeasons(tab, archiveSeasons);
  return allowedSeasons[0] ?? normalizedSeason;
}

export function useHistoryTabSelection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { season } = useLeagueParams();
  const { tab } = useHistoryPageTabsParams();
  const { competitionSeasons } = useCompetitionSeasonsQuery();

  const archiveSeasons = [...competitionSeasons].sort((left, right) => right - left).map(String);

  useEffect(() => {
    if (!tabUsesSeason(tab)) {
      return;
    }

    if (isSeasonAllowedForTab(tab, season, archiveSeasons)) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('season', getFallbackSeason(tab, season, archiveSeasons));
    setSearchParams(nextParams, { replace: true });
  }, [archiveSeasons, tab, season, searchParams, setSearchParams]);

  const setHistoryTab = useCallback(
    (nextTab: HistoryTab) => {
      const nextParams = new URLSearchParams(searchParams);

      nextParams.set('tab', nextTab);

      if (tabUsesSeason(nextTab)) {
        nextParams.set('season', getFallbackSeason(nextTab, season, archiveSeasons));
      }

      setSearchParams(nextParams);
    },
    [archiveSeasons, searchParams, season, setSearchParams]
  );

  const selectRecentSeasonsTab = useCallback(() => {
    setHistoryTab('recent-seasons');
  }, [setHistoryTab]);

  const selectArchiveTab = useCallback(() => {
    setHistoryTab('archive');
  }, [setHistoryTab]);

  const selectTitlesTab = useCallback(() => {
    setHistoryTab('clubs-titles');
  }, [setHistoryTab]);

  const selectAllTimeScorersTab = useCallback(() => {
    setHistoryTab('all-time-scorers');
  }, [setHistoryTab]);

  return {
    tab,
    isArchiveTab: tab === 'archive',
    isRecentSeasonsTab: tab === 'recent-seasons',
    isRecentTitlesTab: tab === 'clubs-titles',
    selectRecentSeasonsTab,
    selectArchiveTab,
    selectTitlesTab,
    selectAllTimeScorersTab,
    setHistoryTab,
  };
}
