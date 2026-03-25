import type { TeamMatches, SelectedTeam } from '../../api/types';

import { Match } from './Match/Match';
import styles from './FullCalendar.module.css';

type CalendarProp = {
  matches: TeamMatches[];
  selectedTeam: SelectedTeam | null;
};

export function FullCalendar({ matches, selectedTeam }: CalendarProp) {
  return (
    <div className={styles.container}>
      {matches.map((m) => (
        <Match key={m.id} match={m} selectedTeam={selectedTeam}></Match>
      ))}
    </div>
  );
}
