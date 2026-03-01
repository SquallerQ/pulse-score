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
  competitionType: 'league' | 'cup';
  onSelectLeague: (league: LeagueItem) => void;
  onSelectCup: () => void;
};

export function LeaguesList({
  leagues,
  selectedLeague,
  competitionType,
  onSelectLeague,
  onSelectCup,
}: LeaguesListProps) {
  return (
    <div className={styles.container}>
      {leagues.map((league, index) => (
        <League
          competitionType="league"
          league={league}
          isActive={selectedLeague?.name === league.name}
          key={index}
          onClick={() => onSelectLeague(league)}
        />
      ))}
      {<League competitionType="cup" isActive={competitionType === 'cup'} onSelectCup={onSelectCup} />}
    </div>
  );
}
