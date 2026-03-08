import styles from './Day.module.css';

import type { TeamMatches } from '../../api/api.ts';

type Day = {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
};

type SelectedTeam = {
  id: number;
  name: string;
  logo: string;
  color: string;
  leagueEmblem: string;
  leagueName: string;
};

type DayProps = {
  day: Day;
  matches: TeamMatches[];
  selectedTeam: SelectedTeam;
};

export function Day({ day, matches, selectedTeam }: DayProps) {
  console.log(selectedTeam);

  let dayTypeClass = '';
  if (day.isPast) {
    dayTypeClass = styles.day__container_past;
  } else if (day.isToday) {
    dayTypeClass = styles.day__container_today;
  } else if (day.isFuture) {
    dayTypeClass = styles.day__container_future;
  }
  const monthShort = day.date.toLocaleDateString('en-US', { month: 'short' });

  function dayMatch(match: TeamMatches): string {
    console.log(match);
    return selectedTeam?.name === match.awayTeam.name ? match.homeTeam.crest : match.awayTeam.crest;
  }

  return (
    <div className={`${styles.day__container} ${dayTypeClass}`}>
      <div className={styles.date}>
        <span className={styles.day}>{day.date.getDate()}</span>
        <span className={styles.month}>{monthShort}</span>
      </div>

      <div className={styles.matches}>
        {matches.length === 0 ? (
          <span className={styles.empty}>No matches</span>
        ) : (
          matches.map((match) => (
            <div className={styles.imageContainer} key={match.id}>
              <img className={styles.image} src={dayMatch(match)} alt="" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
