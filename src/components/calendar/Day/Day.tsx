import styles from './Day.module.css';
import type { TeamMatches } from '../../../api/types';

import { leagueConfig } from '../../../utils/leagueConfig';

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
  const isEmpty = matches.length === 0;

  function getLeagueLogo(code: string, fallbackEmblem: string) {
    return leagueConfig[code]?.logo ?? fallbackEmblem;
  }

  function getDayLeagueClass() {
    if (matches.some((m) => m.competition.code === 'CL')) {
      return styles[leagueConfig['CL'].className];
    }
    for (const match of matches) {
      const config = leagueConfig[match.competition.code];
      if (config) return styles[config.className];
    }
    return '';
  }

  function dayMatch(match: TeamMatches) {
    {
      return match.status === 'FINISHED' ? (
        <div className={`${styles.finished} ${styles.teamsContainer}`}>
          <div className={styles.teamContainer}>
            <img className={styles.teamContainerImage} src={match.awayTeam.crest} alt={match.awayTeam.name} />
            <div className={styles.teamContainerName}>{match.awayTeam.name}</div>
            <div className={styles.score}>{match.score.away}</div>
          </div>
          <div className={styles.teamContainer}>
            <img className={styles.teamContainerImage} src={match.homeTeam.crest} alt={match.homeTeam.name} />
            <div className={styles.teamContainerName}>{match.homeTeam.name}</div>
            <div className={styles.score}>{match.score.home}</div>
          </div>
        </div>
      ) : (
        <div className={styles.teamsContainer}>
          <div className={styles.teamContainer}>
            <img className={styles.teamContainerImage} src={match.homeTeam.crest} alt={match.homeTeam.name} />
            <div className={styles.teamContainerName}>{match.homeTeam.name}</div>
          </div>

          <div className={styles.teamContainer}>
            <img className={styles.teamContainerImage} src={match.awayTeam.crest} alt={match.awayTeam.name} />
            <div className={styles.teamContainerName}>{match.awayTeam.name}</div>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      className={`${styles.dayContainer} ${dayTypeClass} ${isEmpty ? styles.dayContainerEmpty : ''} ${getDayLeagueClass()}`}
    >
      <div className={styles.date}>
        <span className={styles.day}>{day.date.getDate()}</span>
        <span className={styles.month}>{monthShort}</span>
      </div>
      <div className={styles.matches}>
        {isEmpty ? (
          <span className={styles.empty}></span>
        ) : (
          matches.map((match) => (
            <div className={styles.cardContainer} key={match.id}>
              <img
                className={`${styles.tourneyLogo} ${match.competition.code === 'CL' ? styles.championsLeague : ''}`}
                src={getLeagueLogo(match.competition.code, match.competition.emblem)}
                alt="league logo"
              />
              <div className={styles.imageContainer}>{dayMatch(match)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
