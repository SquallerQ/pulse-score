import { useCallback } from 'react';
import { useLeagueParams } from '../filters/useLeagueParams';

type Options = {
  onAfterSelect?: () => void;
};

export function useCompetitionSelection(options?: Options) {
  const { setFilters } = useLeagueParams();

  const selectLeague = useCallback(
    (leagueCode: string) => {
      setFilters({ league: leagueCode, mode: 'league' });
      options?.onAfterSelect?.();
    },
    [setFilters, options]
  );

  const selectCup = useCallback(() => {
    setFilters({ league: 'CL', mode: 'cup' });
    options?.onAfterSelect?.();
  }, [setFilters, options]);

  return { selectLeague, selectCup };
}
