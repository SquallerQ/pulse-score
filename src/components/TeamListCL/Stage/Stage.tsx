import styles from './Stage.module.css';
import type { ChampionsLeagueStageMatch } from '../../../api/types';

type MatchPair = [ChampionsLeagueStageMatch | undefined, ChampionsLeagueStageMatch | undefined];

type StageProps = {
  matches: MatchPair[];
  expectedPairs?: number;
  includeSecondLeg?: boolean;
  stage?: string;
};

export function Stage({ matches, expectedPairs, includeSecondLeg = true, stage }: StageProps) {
  return (
    <div className={styles.stage}>
      {matches.map((pairs, idx) => {
        const [m1, m2] = pairs;
        const homeName = m1?.homeTeam?.name ?? 'TBD';
        const awayName = m1?.awayTeam?.name ?? 'TBD';

        const homeLeg1 = m1?.score?.home ?? '-';
        const awayLeg1 = m1?.score?.away ?? '-';
        const homeLeg2 = m2?.score?.home ?? '-';
        const awayLeg2 = m2?.score?.away ?? '-';

        return (
          <div key={idx} className={`${styles.pair} ${stage === 'final' ? styles.final : ''}`}>
            <div className={styles.row}>
              <div className={styles.teamLogo}>
                <img src={m1?.homeTeam.crest} alt="" />
              </div>
              <div className={styles.team}>{homeName}</div>
              <div className={styles.score}>{homeLeg1}</div>
              {includeSecondLeg && <span className={styles.score}>{awayLeg2}</span>}
            </div>
            <div className={styles.row}>
              <div className={styles.teamLogo}>
                <img src={m2?.homeTeam.crest} alt="" />
              </div>
              <span className={styles.team}>{awayName}</span>
              <span className={styles.score}>{awayLeg1}</span>
              {includeSecondLeg && <span className={styles.score}>{homeLeg2}</span>}
            </div>
          </div>
        );
      })}
      {expectedPairs &&
        Array.from({ length: Math.max(0, expectedPairs - matches.length) }).map((_, idx) => (
          <div key={`tbd-${idx}`} className={`${styles.pair} ${stage === 'final' ? styles.final : ''}`}>
            <div className={styles.row}>
              <span className={styles.team}>TBD</span>
            </div>
            <div className={styles.row}>
              <span className={styles.team}>TBD</span>
            </div>
          </div>
        ))}
    </div>
  );
}
