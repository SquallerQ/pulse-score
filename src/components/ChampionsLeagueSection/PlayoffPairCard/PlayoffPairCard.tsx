import { leagueConfig } from '../../../utils/leagueConfig';
import styles from './PlayoffPairCard.module.css';

type PlayoffPairMatch = {
  status: string;
  utcDate: string;
  homeTeam: {
    name: string | null;
    crest: string | null;
  };
  awayTeam: {
    name: string | null;
    crest: string | null;
  };
  score: {
    home: number | null;
    away: number | null;
  };
};

type PlayoffPairCardProps = {
  match: [PlayoffPairMatch | undefined, PlayoffPairMatch | undefined];
};

export function PlayoffPairCard({ match }: PlayoffPairCardProps) {
  const [firstLeg, secondLeg] = match;
  const tournamentLogo = leagueConfig.CL.logo;

  if (!firstLeg) {
    return null;
  }

  const matchDate = firstLeg.utcDate ? new Date(firstLeg.utcDate) : null;
  const day = matchDate && !isNaN(matchDate.getTime()) ? matchDate.toLocaleDateString('en-GB', { day: '2-digit' }) : '';
  const month =
    matchDate && !isNaN(matchDate.getTime()) ? matchDate.toLocaleDateString('en-GB', { month: 'short' }) : '';

  const homeName = firstLeg.homeTeam.name ?? 'TBD';
  const awayName = firstLeg.awayTeam.name ?? 'TBD';
  const homeTeamLogo = firstLeg.homeTeam.crest ?? '';
  const awayTeamLogo = firstLeg.awayTeam.crest ?? '';
  const winner = isWinner();

  function isWinner() {
    if (!secondLeg || firstLeg === undefined) {
      return null;
    }
    if (firstLeg.status === 'FINISHED' && secondLeg.status === 'FINISHED') {
      const firstTeamScore = firstLeg.score.away! + secondLeg.score.home!;
      const secondTeamScore = firstLeg.score.home! + secondLeg.score.away!;
      if (firstTeamScore > secondTeamScore) {
        return awayName;
      } else {
        return homeName;
      }
    } else {
      return null;
    }
  }

  return (
    <div className={styles.matchContainer}>
      <div className={styles.tourneyAndDateContainer}>
        <img className={styles.tourneyLogo} src={tournamentLogo} alt="UEFA Champions League" />
        <div className={styles.winnerContainer}>
          {winner && (
            winner === homeName ? (
              homeTeamLogo ? <img className={styles.winnerTeamLogo} src={homeTeamLogo} alt="Winner logo" /> : null
            ) : awayTeamLogo ? (
              <img className={styles.winnerTeamLogo} src={awayTeamLogo} alt="Winner logo" />
            ) : null
          )}
          <div className={styles.winnerBadge}>{winner ?? ''}</div>
        </div>
        <div className={styles.date}>
          <span className={styles.day}>{day}</span> <span className={styles.month}>{month}</span>
        </div>
      </div>

      <div className={styles.teamsContainer}>
        <div className={styles.teamContainer}>
          {firstLeg.homeTeam.crest ? <img className={styles.teamLogo} src={firstLeg.homeTeam.crest} alt={homeName} /> : null}
          <div className={`${styles.teamName} ${winner === homeName ? styles.winnerTeamName : ''} `}>{homeName}</div>
          <div className={styles.score}>{firstLeg.score.home ?? '-'}</div>
          <div className={styles.score}>{secondLeg?.score.away ?? '-'}</div>
        </div>

        <div className={styles.teamContainer}>
          {firstLeg.awayTeam.crest ? <img className={styles.teamLogo} src={firstLeg.awayTeam.crest} alt={awayName} /> : null}
          <div className={`${styles.teamName} ${winner === awayName ? styles.winnerTeamName : ''}`}>{awayName}</div>
          <div className={styles.score}>{firstLeg.score.away ?? '-'}</div>
          <div className={styles.score}>{secondLeg?.score.home ?? '-'}</div>
        </div>
      </div>
    </div>
  );
}
