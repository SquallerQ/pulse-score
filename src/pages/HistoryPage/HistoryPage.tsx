import styles from './HistoryPage.module.css';
import championLeagueLogo from '../../assets/champ-league-logo.svg';

import { Season } from '../../components/Season/Season';
import { LeaguesList } from '../../components/LeaguesList/LeaguesList';

import { useLeagueParams } from '../../features/filters/useLeagueParams';
import { useLeagues } from '../../features/leagues/queries/useLeaguesQuery';
import { useCompetitionSelection } from '../../features/filters/useCompetitionSelection';

import { seasonsArray } from '../../utils/generateSeasons';

export default function HistoryPage() {
  const { setSeason, leagueCode, mode } = useLeagueParams();
  const { leagues, currentLeague } = useLeagues(leagueCode);
  const { selectLeague, selectCup } = useCompetitionSelection();

  if (!currentLeague) {
    return <div>Loading league...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leaguesContainer}>
        <div className={styles.leaguesContainer_currentLeague}>
          {leagueCode === 'CL' ? (
            <img className={styles.currentLeagueEmblem} src={championLeagueLogo} alt="Champions League" />
          ) : (
            <img className={styles.currentLeagueEmblem} src={currentLeague.emblem} alt={currentLeague.name} />
          )}
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

      <div className={styles.yearsContainer}>
        {seasonsArray.map((item) => {
          return <Season key={item} year={item.toString()} setSeason={setSeason} />;
        })}
      </div>
    </div>
  );
}
