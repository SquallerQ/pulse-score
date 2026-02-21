import { League } from './League/League';

import styles from './LeaguesList.module.css';

type Leagues = {
  id: number;
  country: string;
  emblem: string;
  name: string;
  flag: string;
  code: string;
};

type LeaguesListProps = {
  leagues: Leagues[];
  selectedLeague: Leagues | null;
  setSelectedLeague: (league: Leagues) => void;
};

export function LeaguesList({ leagues, selectedLeague, setSelectedLeague }: LeaguesListProps) {
  return (
    <div className={styles.container}>
      {leagues.map((league, index) => (
        <League
          league={league}
          isActive={selectedLeague?.name === league.name}
          // setSelectedLeague={setSelectedLeague}
          key={index}
          onClick={() => setSelectedLeague(league)}
        />
      ))}
    </div>
  );
}
