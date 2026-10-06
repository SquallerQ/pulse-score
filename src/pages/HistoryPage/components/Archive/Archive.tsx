import styles from './Archive.module.css';

import { usePulseScoreHistorySeasonQuery } from '../../../../features/history/queries/usePulseScoreHistorySeasonQuery';
import { useCompetitionSeasonsQuery } from '../../../../features/history/queries/useCompetitionSeasonsQuery';

import { useLeagueParams } from '../../../../features/filters/useLeagueParams';

import { Season } from '../../components/Season/Season';



export function Archive() {
  const { competitionSeasons } = useCompetitionSeasonsQuery();

  const { pulseScoreHistoryData } = usePulseScoreHistorySeasonQuery();
  console.log(pulseScoreHistoryData);

  const { season, setSeason, leagueCode } = useLeagueParams();
  console.log(leagueCode);

  

  if (!pulseScoreHistoryData) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.seasonsInfoContainer}>
        <div className={styles.yearsContainer}>
          <div className={styles.yearsContainerInner}>
            {pulseScoreHistoryData
              ? competitionSeasons.map((item) => (
                  <Season
                    key={item}
                    year={item.toString()}
                    setSeason={setSeason}
                    isActive={season === item.toString()}
                  />
                ))
              : null}
          </div>
        </div>
      </div>

      <div className={styles.seasonsInfoContentContainer} data-league-code={leagueCode}>
        <div className={styles.seasonInfoTeamPlace}>
          {pulseScoreHistoryData.standings.map((item) => {
            return (
              <div key={item.id} className={styles.tableContainer}>
                <div className={styles.tablePlace}>{item.place}</div>
                <div className={styles.tableName}>{item.name}</div>
                <div className={styles.tablePoints}>{item.points}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.seasonInfoTopScorers}>
          {pulseScoreHistoryData.topScorers.map((item) => {
            return (
              <div key={item.id} className={styles.topScorersRow}>
                <div className={styles.playerPlace}>{item.place}</div>
                <div className={styles.playerName}>{item.playerName}</div>
                <div className={styles.teamName}>{item.teamName}</div>
                <div className={styles.goals}>{item.goals} goals</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
