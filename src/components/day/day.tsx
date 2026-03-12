import styles from './Day.module.css';

import type { TeamMatches } from '../../api/api.ts';

type Day = {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
};

type DayProps = {
  day: Day;
  matches: TeamMatches[];
};

export function Day({ day, matches }: DayProps) {
  let dayTypeClass = '';
  if (day.isPast) {
    dayTypeClass = styles.dayContainerPast;
  } else if (day.isToday) {
    dayTypeClass = styles.dayContainerToday;
  } else if (day.isFuture) {
    dayTypeClass = styles.dayContainerFuture;
  }
  const monthShort = day.date.toLocaleDateString('en-US', { month: 'short' });

  function dayMatch(match: TeamMatches) {
    // console.log(match);

    {
      return match.status === 'FINISHED' ? (
        <div className={styles.imageContainerScore}>
          <img className={styles.image} src={match.awayTeam.crest} alt={match.awayTeam.name} />
          <div className={styles.score}>{match.score.away}</div> -{' '}
          <div className={styles.score}>{match.score.home}</div>
          <img className={styles.image} src={match.homeTeam.crest} alt={match.homeTeam.name} />
        </div>
      ) : (
        <div className={styles.imageContainer}>
          <img className={styles.image} src={match.awayTeam.crest} alt={match.awayTeam.name} />
          <img className={styles.image} src={match.homeTeam.crest} alt={match.homeTeam.name} />
        </div>
      );
    }
  }

  return (
    <div className={`${styles.dayContainer} ${dayTypeClass}`}>
      <div className={styles.date}>
        <span className={styles.day}>{day.date.getDate()}</span>
        <span className={styles.month}>{monthShort}</span>
      </div>

      <div className={styles.matches}>
        {matches.length === 0 ? (
          <span className={styles.empty}>No matches</span>
        ) : (
          matches.map((match) => (
            <div className={styles.infoContainer}>
              <div className={styles.leagueEmblem}>
                <img src={match.competition.emblem} alt="" />
              </div>
              <div className={styles.imageContainer} key={match.id}>
                {dayMatch(match)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
