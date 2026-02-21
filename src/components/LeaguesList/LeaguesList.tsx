import { League } from './League/League';

import styles from './LeaguesList.module.css';

type LeagueItem = {
  id: number;
  country: string;
  emblem: string;
  name: string;
  flag: string;
  code: string;
};

type LeaguesListProps = {
  leagues: LeagueItem[];
  selectedLeague: LeagueItem | null;
  onSelectLeague: (league: LeagueItem) => void;
};

export function LeaguesList({ leagues, selectedLeague, onSelectLeague }: LeaguesListProps) {
  return (
    <div className={styles.container}>
      {leagues.map((league, index) => (
        <League
          league={league}
          isActive={selectedLeague?.name === league.name}
          key={index}
          onClick={() => onSelectLeague(league)}
        />
      ))}
    </div>
  );
}
