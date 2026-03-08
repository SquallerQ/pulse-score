import { generateDates } from '../../utils/generateDates.ts';
import { Day } from '../Day/Day.tsx';
import type { TeamMatches } from '../../api/api.ts';

import styles from './Calendar.module.css';

type CalendarProp = {
  matches: TeamMatches[];
  selectedTeam: SelectedTeam | null;
};

type SelectedTeam = {
  id: number;
  name: string;
  logo: string;
  color: string;
  leagueEmblem: string;
  leagueName: string;
};

export function Calendar({ matches, selectedTeam }: CalendarProp) {
  const daysArray = generateDates();

  if (!selectedTeam) {
    return <div className={styles.calendar__container}>No data</div>;
  }

  return (
    <div className={styles.calendar__container}>
      {daysArray.map((day, index) => {
        const dayMatches = matches.filter((match) => {
          const matchDate = new Date(match.utcDate).toDateString();
          return matchDate === day.date.toDateString();
        });
        return <Day day={day} matches={dayMatches} key={index} selectedTeam={selectedTeam} />;
      })}
    </div>
  );
}
