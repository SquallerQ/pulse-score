import styles from './HistoryPage.module.css';
import plLeague from '../../assets/pl-league-logo-league-list--white.svg';

import championLeagueLogo from '../../assets/champ-league-white-logo.svg';

import { Season } from '../../components/Season/Season';
import { LeaguesList } from '../../components/LeaguesList/LeaguesList';

import { useLeagueParams } from '../../features/filters/useLeagueParams';
import { useLeagues } from '../../features/leagues/queries/useLeaguesQuery';
import { useCompetitionSelection } from '../../features/filters/useCompetitionSelection';
import { useSeasonChampionQuery } from '../../features/leagues/queries/useSeasonChampionQuery';
import { useChampionsLeagueWinnerQuery } from '../../features/champions-league/queries/useChampionsLeagueWinnerQuery';
import { useSharedTopScorersQuery } from '../../features/shared/queries/useSharedTopScorersQuery';
import { HistoryPageSkeleton } from './HistoryPageSkeleton';

import { seasonsArray } from '../../utils/generateSeasons';

import type { TopScorer } from '../../api/api-football/types';

import { useTop3epl2019Query } from '../../api/my-backend/api';

export default function HistoryPage() {
  const { season, setSeason, leagueCode, mode } = useLeagueParams();
  const { leaguesQuery, leagues, currentLeague } = useLeagues(leagueCode);
  const { selectLeague, selectCup } = useCompetitionSelection();
  const { leagueInfoTopScorersQuery } = useSharedTopScorersQuery();
  const { seasonChampionQuery } = useSeasonChampionQuery();
  const { CLFinalWinner, CLFinalLoser, CLFinalQuery } = useChampionsLeagueWinnerQuery();

  //Test
  const { data } = useTop3epl2019Query();
  console.log(data);
  //Test

  const seasonTopThree = seasonChampionQuery.data?.standings ?? [];
  const topScorers = leagueInfoTopScorersQuery.data ?? [];
  const leftColumnScorers = topScorers.slice(0, 10);
  const rightColumnScorers = topScorers.slice(10);

  const shouldShowHistorySkeleton =
    (leaguesQuery.isPending && !leaguesQuery.data) ||
    (leagueInfoTopScorersQuery.isPending && !leagueInfoTopScorersQuery.data) ||
    (mode === 'league'
      ? seasonChampionQuery.isPending && !seasonChampionQuery.data
      : CLFinalQuery.isPending && !CLFinalQuery.data);

  if (shouldShowHistorySkeleton || !currentLeague) {
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

      <div className={styles.seasonsInfoContainer}>
        <div className={styles.yearsContainer}>
          <div className={styles.yearsContainerInner}>
            {seasonsArray.map((item) => {
              return (
                <Season key={item} year={item.toString()} setSeason={setSeason} isActive={season == item.toString()} />
              );
            })}
          </div>
        </div>

        <div className={styles.seasonsInfoContentContainer} data-league-code={leagueCode}>
          {seasonTopThree.length > 0 || mode === 'cup' ? (
            <div className={styles.seasonSummaryContainer}>
              <div className={styles.summaryHeader}>
                <div className={styles.summaryEyebrow}>Final standings snapshot</div>
                <h2 className={styles.summaryTitle}>
                  {mode === 'cup' ? `${season} Champions League final` : `${season} season podium`}
                </h2>
              </div>

              {mode === 'league' ? (
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
              ) : (
                <div>
                  <div className={styles.podiumGrid}>
                    <div className={`${styles.podiumCard} ${styles.podiumCardFirst}`}>
                      <div className={styles.podiumRank}>{1}</div>
                      <img className={styles.podiumLogo} src={CLFinalWinner.logo} alt={CLFinalWinner.name} />
                      <div className={styles.podiumText}>
                        <div className={styles.podiumTeamName}>{CLFinalWinner.name}</div>
                      </div>
                    </div>

                    <div className={`${styles.podiumCard} ${styles.podiumCardSecond}`}>
                      <div className={styles.podiumRank}>{2}</div>
                      <img className={styles.podiumLogo} src={CLFinalLoser.logo} alt={CLFinalLoser.name} />
                      <div className={styles.podiumText}>
                        <div className={styles.podiumTeamName}>{CLFinalLoser.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className={styles.topScorersContainer}>
            <div className={styles.topScorersColumn}>
              {leftColumnScorers.map((item: TopScorer, index: number) => {
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
                      <div className={styles.teamName}>{item.team.name}</div>
                      <img className={styles.teamLogo} src={item.team.logo} alt={item.team.name} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.topScorersColumn}>
              {rightColumnScorers.map((item: TopScorer, index: number) => {
                return (
                  <div key={item.id} className={styles.topScorersRow}>
                    <div className={styles.playerRank}>{index + 11}</div>

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
                      <div className={styles.teamName}>{item.team.name}</div>
                      <img className={styles.teamLogo} src={item.team.logo} alt={item.team.name} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
