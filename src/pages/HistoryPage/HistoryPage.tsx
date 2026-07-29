import styles from './HistoryPage.module.css';
import plLeague from '../../assets/pl-league-logo-league-list--white.svg';
import championLeagueLogo from '../../assets/champ-league-white-logo.svg';

import { Season } from './components/Season/Season';

import { LeaguesList } from '../../components/LeaguesList/LeaguesList';

import { useLeagueParams } from '../../features/filters/useLeagueParams';
import { useLeagues } from '../../features/leagues/queries/useLeaguesQuery';
import { useCompetitionSelection } from '../../features/filters/useCompetitionSelection';

// import { seasonsArray } from '../../utils/generateSeasons';

import { HistoryTabs } from './components/HistoryTabs/HistoryTabs';

import { useHistoryTabSelection } from '../../features/filters/useHistoryTabSelection';
import type { HistoryTab } from '../../features/filters/useHistoryPageParams';

import { Archive } from './components/Archive/Archive';
import { RecentSeasons } from './components/RecentSeasons/RecentSeasons';

import { usePulseScoreHistorySeasonQuery } from '../../features/history/queries/usePulseScoreHistorySeasonQuery';
import { HistoryPageSkeleton } from './HistoryPageSkeleton';

export default function HistoryPage() {
  const { season, setSeason, leagueCode, mode } = useLeagueParams();

  const { leaguesQuery, leagues, currentLeague } = useLeagues(leagueCode);
  const { selectLeague, selectCup } = useCompetitionSelection();

  const { tab, selectArchiveTab, selectRecentSeasonsTab } = useHistoryTabSelection();

  function selectTab(tab: HistoryTab) {
    switch (tab) {
      case 'archive':
        return <Archive />;

      case 'recent-seasons':
        return <RecentSeasons />;

      default:
        return null;
    }
  }

  //Test
  const { pulseScoreHistoryData } = usePulseScoreHistorySeasonQuery();
  console.log(pulseScoreHistoryData?.season);

  // const { searchParams } = useHistoryPageTabsParams();
  // console.log(searchParams);

  //Test

  if ((leaguesQuery.isPending && !leaguesQuery.data) || !currentLeague) {
    return <HistoryPageSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leaguesContainer}>
        <div className={styles.leaguesContainer_currentLeague} data-league-code={leagueCode}>
          {leagueCode === 'CL' ? (
            <img className={styles.currentLeagueEmblem} src={championLeagueLogo} alt="Champions League" />
          ) : leagueCode === 'PL' ? (
            <img className={styles.currentLeagueEmblem} src={plLeague} alt={currentLeague.name} />
          ) : (
            <img className={styles.currentLeagueEmblem} src={currentLeague.emblem} alt={currentLeague.name} />
          )}
          <span className={styles.currentLeagueSeason}>{season}</span>
        </div>

        <div data-layout="row" className={styles.leaguesContainer_leagues}>
          <LeaguesList
            leagues={leagues}
            selectedLeague={currentLeague}
            mode={mode}
            onSelectLeague={selectLeague}
            onSelectCup={selectCup}
          />
        </div>
      </div>
      <HistoryTabs activeTab={tab} onSelectArchive={selectArchiveTab} onSelectRecentSeasons={selectRecentSeasonsTab} />
      {selectTab(tab)}
      {pulseScoreHistoryData ? (
        <Season
          year={pulseScoreHistoryData.season.toString()}
          setSeason={setSeason}
          isActive={season == pulseScoreHistoryData.season.toString()}
        />
      ) : null}
    </div>
  );
}
