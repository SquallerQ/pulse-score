import styles from './HistoryPage.module.css';

import { Season } from '../../components/Season/Season';
import { HistoryLeague } from '../../components/HistoryLeague/HistoryLeague';

import { useLeagueParams } from '../../features/filters/useLeagueParams';
import { useLeagues } from '../../features/leagues/queries/useLeaguesQuery';

export default function HistoryPage() {
  const { season, setSeason, leagueCode, setLeagueCode } = useLeagueParams();
  const { leagues, currentLeague } = useLeagues(leagueCode);

  const seasonsArray = [] as number[];
  function generateSeasons() {
    const date = new Date();
    const lastSeason = date.getFullYear();
    for (let i = 0; i < 10; i++) {
      const year = lastSeason - i;
      seasonsArray.push(year);
    }
  }
  generateSeasons();

  // console.log(seasonsArray);

  return (
    <div className={styles.container}>
      <div>
        {leagues.map((league) => {
          // console.log(league);

          return <HistoryLeague key={league.id} league={league} setLeagueCode={setLeagueCode} />;
        })}
      </div>

      <div className={styles.yearsContainer}>
        {seasonsArray.map((item) => {
          return <Season key={item} year={item.toString()} setSeason={setSeason} />;
        })}
      </div>
    </div>
  );
}
