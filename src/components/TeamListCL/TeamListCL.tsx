import { useState } from 'react';
import styles from './TeamListCL.module.css';
import { TeamCL } from './TeamCL/TeamCL';
import { Playoffs } from './Playoffs/Playoffs';

import { Stage } from './Stage/Stage';
import { TableCL, type LeagueTable } from '../TableCL/TableCL';
import { CLInfo } from '../TableCL/CLInfo';

import type { ChampionsLeagueStage, ChampionsLeagueStageMatch } from '../../api/types';

type PropsType = {
  teams: TeamListCLItem[];
  championsLeagueStages?: ChampionsLeagueStage[];
  leagueTable: LeagueTable | null;
};

type TeamListCLItem = {
  id: number;
  name: string;
  logo: string;
};

export function TeamListCL({ teams, championsLeagueStages, leagueTable }: PropsType) {
  const [contentView, setContentView] = useState<'bracket' | 'table'>('bracket');
  const totalTeams = leagueTable?.table.length ?? 36;
  const directSpots = Math.min(8, totalTeams);
  const playoffSpots = Math.max(Math.min(24, totalTeams) - 8, 0);
  const eliminatedSpots = Math.max(totalTeams - 24, 0);

  const playoffsMatches =
    championsLeagueStages?.filter((item) => item.stage === 'PLAYOFFS').flatMap((item) => item.matches) ?? [];

  const last16Matches =
    championsLeagueStages?.filter((item) => item.stage === 'LAST_16').flatMap((item) => item.matches) ?? [];

  const quarterMatches =
    championsLeagueStages?.filter((item) => item.stage === 'QUARTER_FINALS').flatMap((item) => item.matches) ?? [];

  const semiMatches =
    championsLeagueStages?.filter((item) => item.stage === 'SEMI_FINALS').flatMap((item) => item.matches) ?? [];

  const finalMatches =
    championsLeagueStages?.filter((item) => item.stage === 'FINAL').flatMap((item) => item.matches) ?? [];

  const pairOrder = [552068, 552069, 552070, 552071, 552072, 552073, 552075, 552074];

  function buildPairs(matches: ChampionsLeagueStageMatch[]) {
    const firstLeg = matches.filter((m) => m.matchday === 1);
    const secondLeg = matches.filter((m) => m.matchday === 2);

    return firstLeg.map((match1) => {
      const match2 = secondLeg.find(
        (m) =>
          (m.homeTeam.id === match1.homeTeam.id && m.awayTeam.id === match1.awayTeam.id) ||
          (m.homeTeam.id === match1.awayTeam.id && m.awayTeam.id === match1.homeTeam.id)
      );
      return [match1, match2] as [ChampionsLeagueStageMatch, ChampionsLeagueStageMatch | undefined];
    });
  }

  function sortPairsByIdOrder(
    pairs: [ChampionsLeagueStageMatch, ChampionsLeagueStageMatch | undefined][],
    order: number[]
  ) {
    return order
      .map((id) => pairs.find((pair) => pair[0]?.id === id))
      .filter((pair): pair is [ChampionsLeagueStageMatch, ChampionsLeagueStageMatch | undefined] => Boolean(pair));
  }

  function getWinnerFromPair(pair: [ChampionsLeagueStageMatch, ChampionsLeagueStageMatch | undefined]) {
    const [m1, m2] = pair;
    if (!m2) return null;

    const teamAId = m1.homeTeam.id;
    const teamBId = m1.awayTeam.id;

    const teamAScore = (m1.score.home ?? 0) + (m2.score.away ?? 0);
    const teamBScore = (m1.score.away ?? 0) + (m2.score.home ?? 0);

    if (teamAScore === teamBScore) {
      return m1.homeTeam.id;
    }
    return teamAScore > teamBScore ? teamAId : teamBId;
  }
  const playoffsPairs = buildPairs(playoffsMatches);

  const last16Pairs = sortPairsByIdOrder(buildPairs(last16Matches), pairOrder);

  const last16Winners = last16Pairs.map((pair) => getWinnerFromPair(pair)).filter((id): id is number => id !== null);

  const quarterOrderByWinners: [number, number][] = [
    [last16Winners[0], last16Winners[1]],
    [last16Winners[2], last16Winners[3]],
    [last16Winners[4], last16Winners[5]],
    [last16Winners[6], last16Winners[7]],
  ];

  const quarterPairs = buildPairs(quarterMatches);

  function sortPairsByTeamIds(
    pairs: [ChampionsLeagueStageMatch, ChampionsLeagueStageMatch | undefined][],
    order: [number, number][]
  ) {
    return order
      .map(([a, b]) =>
        pairs.find((pair) => {
          const team1 = pair[0].homeTeam.id;
          const team2 = pair[0].awayTeam.id;
          return (team1 === a && team2 === b) || (team1 === b && team2 === a);
        })
      )
      .filter((pair): pair is [ChampionsLeagueStageMatch, ChampionsLeagueStageMatch | undefined] => Boolean(pair));
  }

  const quarterPairsSorted = quarterOrderByWinners.every(([a, b]) => a && b)
    ? sortPairsByTeamIds(quarterPairs, quarterOrderByWinners)
    : quarterPairs;

  function splitArray<T>(arr: T[], side: 'left' | 'right') {
    const mid = arr.length / 2;
    return side === 'left' ? arr.slice(0, mid) : arr.slice(mid);
  }

  const last16Left = splitArray(last16Pairs, 'left');
  const last16Right = splitArray(last16Pairs, 'right');
  const quarterLeft = splitArray(quarterPairsSorted, 'left');
  const quarterRight = splitArray(quarterPairsSorted, 'right');

  const quarterWinners = quarterPairsSorted
    .map((pair) => getWinnerFromPair(pair))
    .filter((id): id is number => id !== null);

  const semiOrderByWinners: [number, number][] = [
    [quarterWinners[0], quarterWinners[1]],
    [quarterWinners[2], quarterWinners[3]],
  ];

  const semiPairs = buildPairs(semiMatches);
  const canSortSemis =
    semiOrderByWinners.every(([a, b]) => a && b) &&
    semiPairs.every((pair) => pair[0].homeTeam.id != null && pair[0].awayTeam.id != null);
  const semiPairsSorted = canSortSemis ? sortPairsByTeamIds(semiPairs, semiOrderByWinners) : semiPairs;

  const semiLeft = splitArray(semiPairsSorted, 'left');
  const semiRight = splitArray(semiPairsSorted, 'right');

  const semiWinners = semiPairsSorted.map((pair) => getWinnerFromPair(pair)).filter((id): id is number => id !== null);

  const finalOrderByWinners: [number, number][] = [[semiWinners[0], semiWinners[1]]];
  const finalPairs = buildPairs(finalMatches);
  const canSortFinal =
    finalOrderByWinners.every(([a, b]) => a && b) &&
    finalPairs.every((pair) => pair[0].homeTeam.id != null && pair[0].awayTeam.id != null);
  const finalPairsSorted = canSortFinal ? sortPairsByTeamIds(finalPairs, finalOrderByWinners) : finalPairs;

  return (
    <>
      <div className={styles.container}>
        {teams.map((item) => {
          return <TeamCL team={item} key={item.id} />;
        })}
      </div>

      <div className={styles.toggleButtonContainer}>
        <button
          onClick={() => setContentView('bracket')}
          className={contentView === 'bracket' ? styles.active : ''}
          type="button"
        >
          Bracket
        </button>
        <button
          onClick={() => setContentView('table')}
          className={contentView === 'table' ? styles.active : ''}
          type="button"
        >
          Table
        </button>
      </div>

      {contentView === 'bracket' ? (
        <>
          <div className={styles.playoffsContainer}>
            {playoffsPairs.map((item) => {
              return <Playoffs match={item} />;
            })}
          </div>
          <div className={styles.bracket}>
            <div className={styles.side}>
              <Stage matches={last16Left} expectedPairs={4} />
              <Stage matches={quarterLeft} expectedPairs={2} />
              <Stage matches={semiLeft} expectedPairs={1} />
            </div>

            <div className={styles.final}>
              <Stage matches={finalPairsSorted} expectedPairs={1} includeSecondLeg={false} stage={'final'} />
            </div>

            <div className={styles.side}>
              <Stage matches={semiRight} expectedPairs={1} />
              <Stage matches={quarterRight} expectedPairs={2} />
              <Stage matches={last16Right} expectedPairs={4} />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.contentContainer}>
          <div className={styles.tableSection}>
            <div className={styles.tableStats}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Teams</span>
                <strong className={styles.statValue}>{totalTeams}</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Direct to R16</span>
                <strong className={styles.statValue}>{directSpots}</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Play-off</span>
                <strong className={styles.statValue}>{playoffSpots}</strong>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Eliminated</span>
                <strong className={styles.statValue}>{eliminatedSpots}</strong>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <TableCL leagueTable={leagueTable} />
            </div>
            <CLInfo />
          </div>
        </div>
      )}
    </>
  );
}
