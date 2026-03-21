import styles from './Match.module.css';
import type { TeamMatches } from '../../../api/types';

type matchProp = {
  match: TeamMatches;
};

export function Match({ match }: matchProp) {
  console.log(match);
  const matchDate = new Date(match.utcDate);
  const dateLabel = Number.isNaN(matchDate.getTime())
    ? ''
    : matchDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  if (match.status === 'FINISHED') {
    return (
      <div className={styles.finished}>
        <div className={styles.tourneyAndDateContainer}>
          <img className={styles.tourneyLogo} src={match.competition.emblem} alt={match.competition.name} />
          <div className={styles.date}>{dateLabel}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div>{match.awayTeam.name}</div>
        </div>
        <span>{match.score.home}</span> - <span>{match.score.away}</span>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div>{match.homeTeam.name}</div>
        </div>
      </div>
    );
  } else if (match.status === 'TIMED') {
    return (
      <div className={styles.timed}>
        <div className={styles.tourneyAndDateContainer}>
          <img className={styles.tourneyLogo} src={match.competition.emblem} alt={match.competition.name} />
          <div className={styles.date}>{dateLabel}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div>{match.awayTeam.name}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div>{match.homeTeam.name}</div>
        </div>
      </div>
    );
  } else if (match.status === 'POSTPONED') {
    return (
      <div className={styles.postponed}>
        <div className={styles.tourneyAndDateContainer}>
          <img className={styles.tourneyLogo} src={match.competition.emblem} alt={match.competition.name} />
          <div className={styles.date}>{dateLabel}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div>{match.awayTeam.name}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div>{match.homeTeam.name}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.matchContainer}>
        <div className={styles.tourneyAndDateContainer}>
          <img className={styles.tourneyLogo} src={match.competition.emblem} alt={match.competition.name} />
          <div className={styles.date}>{dateLabel}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.awayTeam.crest} alt={match.awayTeam.name}></img>
          <div>{match.awayTeam.name}</div>
        </div>
        <div className={styles.teamContainer}>
          <img className={styles.teamLogo} src={match.homeTeam.crest} alt={match.homeTeam.name}></img>
          <div>{match.homeTeam.name}</div>
        </div>
      </div>
    );
  }
}
