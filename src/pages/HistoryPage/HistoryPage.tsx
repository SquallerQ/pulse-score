import styles from './HistoryPage.module.css';
import championLeagueLogo from '../../assets/champ-league-logo.svg';

import { Season } from '../../components/Season/Season';
import { LeaguesList } from '../../components/LeaguesList/LeaguesList';

import { useLeagueParams } from '../../features/filters/useLeagueParams';
import { useLeagues } from '../../features/leagues/queries/useLeaguesQuery';
import { useCompetitionSelection } from '../../features/filters/useCompetitionSelection';
import { useTopScorersQuery } from '../../features/leagues/queries/useTopScorersQuery';
import { useSeasonChampionQuery } from '../../features/leagues/queries/useSeasonChampionQuery';

import { seasonsArray } from '../../utils/generateSeasons';

import type { TopScorer } from '../../api/apiFootballApi';

export default function HistoryPage() {
  const { setSeason, leagueCode, mode } = useLeagueParams();
  const { leagues, currentLeague } = useLeagues(leagueCode);
  const { selectLeague, selectCup } = useCompetitionSelection();
  const { leagueInfoTopScorersQuery } = useTopScorersQuery();
  const { seasonChampionQuery } = useSeasonChampionQuery();
  const seasonTopThree = seasonChampionQuery.data?.standings ?? [];

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

      <div className={styles.seasonsInfoContainer}>
        <div className={styles.yearsContainer}>
          {seasonsArray.map((item) => {
            return <Season key={item} year={item.toString()} setSeason={setSeason} />;
          })}
        </div>

        {seasonTopThree.length > 0 ? (
          <div className={styles.seasonSummaryContainer}>
            <div className={styles.summaryHeader}>
              <div className={styles.summaryEyebrow}>Final standings snapshot</div>
              <h2 className={styles.summaryTitle}>{seasonChampionQuery.data?.season} season podium</h2>
            </div>

            <div className={styles.podiumGrid}>
              {seasonTopThree.map((item) => (
                <div
                  key={item.team.id}
                  className={`${styles.podiumCard} ${
                    item.rank === 1
                      ? styles.podiumCardFirst
                      : item.rank === 2
                        ? styles.podiumCardSecond
                        : styles.podiumCardThird
                  }`}
                >
                  <div className={styles.podiumRank}>{item.rank}</div>
                  <img className={styles.podiumLogo} src={item.team.logo} alt={item.team.name} />
                  <div className={styles.podiumText}>
                    <div className={styles.podiumTeamName}>{item.team.name}</div>
                    <div className={styles.podiumPoints}>{item.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className={styles.topScorersContainer}>
          {leagueInfoTopScorersQuery.data.map((item: TopScorer, index: number) => {
            return (
              <div key={item.id} className={styles.topScorersRow}>
                <div className={styles.playerRank}>{index + 1}</div>

                <div className={styles.playerIdentity}>
                  <img className={styles.photo} src={item.photo} alt={item.name} />
                  <div className={styles.playerText}>
                    <div className={styles.playerName}>{item.name}</div>
                    <div className={styles.playerNationality}>{item.nationality}</div>
                  </div>
                </div>

                <div className={styles.playerStats}>
                  <div className={styles.statCard}>
                    <span className={styles.statLabel}>Goals</span>
                    <span className={styles.statValue}>{item.goals}</span>
                  </div>
                  <div className={styles.statCard}>
                    <span className={styles.statLabel}>Assists</span>
                    <span className={styles.statValue}>{item.assists ?? 0}</span>
                  </div>
                </div>

                <div className={styles.teamInfo}>
                  <img className={styles.teamLogo} src={item.team.logo} alt={item.team.name} />
                  <div className={styles.teamName}>{item.team.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
