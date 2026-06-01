import { generateDates } from '../../utils/generateDates.ts';
import { Day } from './Day/Day.tsx';
import type { TeamMatch } from '../../api/football-data/types';

import styles from './Calendar.module.css';

type CalendarProps = {
  matches: TeamMatch[];
};

export function Calendar({ matches }: CalendarProps) {
  const daysArray = generateDates();

  return (
    <div className={styles.container}>
      {daysArray.map((day, index) => {
        const dayMatches = matches.filter((match) => {
          const matchDate = new Date(match.utcDate).toDateString();
          return matchDate === day.date.toDateString();
        });
        return <Day day={day} matches={dayMatches} key={index} />;
      })}
    </div>
  );
}
