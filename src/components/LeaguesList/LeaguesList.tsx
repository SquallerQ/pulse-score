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
  mode: 'league' | 'cup';
  onSelectLeague: (leagueCode: string) => void;
  onSelectCup: () => void;
};

export function LeaguesList({ leagues, selectedLeague, mode, onSelectLeague, onSelectCup }: LeaguesListProps) {
  return (
    <div className={styles.container}>
      {leagues.map((league) => (
        <League
          mode="league"
          league={league}
          isActive={mode === 'league' && selectedLeague?.name === league.name}
          key={league.name}
          onSelectLeague={() => onSelectLeague(league.code)}
        />
      ))}
      {<League mode="cup" isActive={mode === 'cup'} onSelectCup={onSelectCup} />}
    </div>
  );
}
