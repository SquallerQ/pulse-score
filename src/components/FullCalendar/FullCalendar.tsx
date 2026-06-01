import type { LeagueTeamItem, TeamMatch } from '../../api/football-data/types';

import { Match } from './Match/Match';
import styles from './FullCalendar.module.css';

type FullCalendarProps = {
  matches: TeamMatch[];
  selectedTeam: LeagueTeamItem | null;
};

export function FullCalendar({ matches, selectedTeam }: FullCalendarProps) {
  return (
    <div className={styles.container}>
      {matches.map((m) => (
        <Match key={m.id} match={m} selectedTeam={selectedTeam}></Match>
      ))}
    </div>
  );
}
