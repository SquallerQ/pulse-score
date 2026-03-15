import { generateDates } from '../../utils/generateDates.ts';
import { Day } from '../Day/Day.tsx';
import type { TeamMatches } from '../../api/types.ts';

import styles from './Calendar.module.css';

type CalendarProp = {
  matches: TeamMatches[];
};

export function Calendar({ matches }: CalendarProp) {
  // console.log(matches);

  const daysArray = generateDates();

  return (
    <div className={styles.calendar__container}>
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
