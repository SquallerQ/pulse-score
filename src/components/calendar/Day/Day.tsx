import styles from './Day.module.css';
import type { TeamMatch } from '../../../api/football-data/types';

import { leagueConfig } from '../../../utils/leagueConfig';

type Day = {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
};

type DayProps = {
  day: Day;
  matches: TeamMatch[];
};

export function Day({ day, matches }: DayProps) {
  const dayTypeClass = day.isPast
    ? styles.dayContainerPast
    : day.isToday
      ? styles.dayContainerToday
      : styles.dayContainerFuture;
  const monthShort = day.date.toLocaleDateString('en-US', { month: 'short' });
  const isEmpty = matches.length === 0;

  function getLeagueLogo(code: string, fallbackEmblem: string) {
    return leagueConfig[code]?.logo ?? fallbackEmblem;
  }

  function getDayLeagueClass(): string {
    if (matches.some((m) => m.competition.code === 'CL')) {
      return styles.dayContainerCL;
    }

    for (const match of matches) {
      const config = leagueConfig[match.competition.code];
      if (config?.className && config.className in styles) {
        return styles[config.className as keyof typeof styles];
      }
    }

    return '';
  }

  function dayMatch(match: TeamMatch) {
    const penaltyWinnerLabel =
      match.competition.code === 'CL' && match.score.wonOnPenalties
        ? match.score.winner === 'HOME_TEAM'
          ? `${match.homeTeam.name} won on pens`
          : match.score.winner === 'AWAY_TEAM'
            ? `${match.awayTeam.name} won on pens`
            : null
        : null;

    {
      return match.status === 'FINISHED' ? (
        <div className={`${styles.finished} ${styles.teamsContainer}`}>
          {penaltyWinnerLabel ? <div className={styles.penaltyInfo}>{penaltyWinnerLabel}</div> : null}
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
