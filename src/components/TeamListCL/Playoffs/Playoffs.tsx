import { leagueConfig } from '../../../utils/leagueConfig';
import styles from './Playoffs.module.css';

type PlayoffsMatch = {
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

type PlayoffsProps = {
  match: [PlayoffsMatch | undefined, PlayoffsMatch | undefined];
};

export function Playoffs({ match }: PlayoffsProps) {
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

  return (
    <div className={styles.matchContainer}>
      <div className={styles.tourneyAndDateContainer}>
        <img className={styles.tourneyLogo} src={tournamentLogo} alt="UEFA Champions League" />
        <div className={styles.date}>
          <span className={styles.day}>{day}</span> <span className={styles.month}>{month}</span>
        </div>
      </div>

      <div className={styles.teamsContainer}>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={firstLeg.homeTeam.crest ?? ''} alt={homeName} />
          <div className={styles.teamName}>{homeName}</div>
          <div className={styles.score}>{firstLeg.score.home ?? '-'}</div>
          <div className={styles.score}>{secondLeg?.score.away ?? '-'}</div>
        </div>

        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={firstLeg.awayTeam.crest ?? ''} alt={awayName} />
          <div className={styles.teamName}>{awayName}</div>
          <div className={styles.score}>{firstLeg.score.away ?? '-'}</div>
          <div className={styles.score}>{secondLeg?.score.home ?? '-'}</div>
        </div>
      </div>
    </div>
  );
}
