import { generateDates } from '../../utils/generateDates.ts';
import { Day } from '../Day/Day.tsx';

import styles from './Calendar.module.css';

export function Calendar() {
  const daysArray = generateDates();

  return (
    <div className={styles.calendar__container}>
      {daysArray.map((day, index) => {
        return <Day day={day} key={index} />;
      })}
    </div>
  );
}
