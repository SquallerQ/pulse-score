import { leagueConfig } from '../../../utils/leagueConfig';
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
  const tournamentLogo = leagueConfig.CL.logo;

  return (
    <div className={styles.stage}>
      {matches.map((pairs, idx) => {
        const [m1, m2] = pairs;
        const homeName = m1?.homeTeam?.name ?? 'TBD';
        const awayName = m1?.awayTeam?.name ?? 'TBD';
        const matchDate = m1?.utcDate ? new Date(m1.utcDate) : null;
        const day = matchDate && !isNaN(matchDate.getTime()) ? matchDate.toLocaleDateString('en-GB', { day: '2-digit' }) : '';
        const month =
          matchDate && !isNaN(matchDate.getTime()) ? matchDate.toLocaleDateString('en-GB', { month: 'short' }) : '';

        const homeLeg1 = m1?.score?.home ?? '-';
        const awayLeg1 = m1?.score?.away ?? '-';
        const homeLeg2 = m2?.score?.home ?? '-';
        const awayLeg2 = m2?.score?.away ?? '-';

        return (
          <div key={idx} className={`${styles.matchContainer} ${stage === 'final' ? styles.finalCard : ''}`}>
            <div className={styles.tourneyAndDateContainer}>
              <img className={styles.tourneyLogo} src={tournamentLogo} alt="UEFA Champions League" />
              <div className={styles.date}>
                <span className={styles.day}>{day}</span> <span className={styles.month}>{month}</span>
              </div>
            </div>
            <div className={styles.teamsContainer}>
              <div className={styles.teamContainer}>
                <img className={styles.teamLogo} src={m1?.homeTeam?.crest} alt={homeName} />
                <div className={styles.teamName}>{homeName}</div>
                <div className={styles.score}>{homeLeg1}</div>
                {includeSecondLeg && <div className={styles.score}>{awayLeg2}</div>}
              </div>
              <div className={styles.teamContainer}>
                <img className={styles.teamLogo} src={m1?.awayTeam?.crest} alt={awayName} />
                <div className={styles.teamName}>{awayName}</div>
                <div className={styles.score}>{awayLeg1}</div>
                {includeSecondLeg && <div className={styles.score}>{homeLeg2}</div>}
              </div>
            </div>
          </div>
        );
      })}
      {expectedPairs &&
        Array.from({ length: Math.max(0, expectedPairs - matches.length) }).map((_, idx) => (
          <div key={`tbd-${idx}`} className={`${styles.matchContainer} ${stage === 'final' ? styles.finalCard : ''}`}>
            <div className={styles.tourneyAndDateContainer}>
              <img className={styles.tourneyLogo} src={tournamentLogo} alt="UEFA Champions League" />
              <div className={styles.date}>
                <span className={styles.day}>--</span> <span className={styles.month}>---</span>
              </div>
            </div>
            <div className={styles.teamsContainer}>
              <div className={styles.teamContainer}>
                <div className={styles.teamName}>TBD</div>
              </div>
              <div className={styles.teamContainer}>
                <div className={styles.teamName}>TBD</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
