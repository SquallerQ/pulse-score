import type { TeamMatches } from '../../api/types';

import { Match } from './Match/Match';
import styles from './FullCalendar.module.css';

type CalendarProp = {
  matches: TeamMatches[];
};

export function FullCalendar({ matches }: CalendarProp) {
  console.log(matches);

  return (
    <div className={styles.container}>
      {matches.map((m) => (
        <Match key={m.id} match={m}></Match>
      ))}
    </div>
  );
}
