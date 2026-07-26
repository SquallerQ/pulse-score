import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';

export type HistoryTab = 'recent-seasons' | 'archive';
const TABS = ['recent-seasons', 'archive'] as const;

const DEFAULT_TAB: HistoryTab = 'recent-seasons';

export function isValidTab(value: string | null): value is HistoryTab {
  if (!value) return false;
  return TABS.includes(value as HistoryTab);
}

export function normalizeTab(value: string | null): HistoryTab {
  return isValidTab(value) ? value : DEFAULT_TAB;
}

export function useHistoryPageTabsParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = useMemo(() => normalizeTab(searchParams.get('tab')), [searchParams]);

  useEffect(() => {
    const rawTab = searchParams.get('tab');

    if (rawTab === tab) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('tab', tab);
    setSearchParams(nextParams, { replace: true });
  }, [tab, searchParams, setSearchParams]);

  const setTab = useCallback(
    (nextTab: string) => {
      const normalized = normalizeTab(nextTab);
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('tab', normalized);
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  return {
    tab,
    setTab,
  };
}
