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

type championsLeagueItem = {
  id: number;
  emblem: string;
  name: string;
  // flag: string;
  code: string;
};

type LeaguesListProps = {
  leagues: LeagueItem[];
  selectedLeague: LeagueItem | null;
  onSelectLeague: (league: LeagueItem) => void;
  leagueOrCup?: string;
  championsLeague?: championsLeagueItem[];
};

export function LeaguesList({
  leagues,
  selectedLeague,
  onSelectLeague,
  championsLeagueTeams,
  championsLeagueMatches,
  leagueOrCup,
  consoleChampionsLeagueMatches
}: LeaguesListProps) {
  // console.log(championsLeague);
  // console.log(leagues);

  return (
    <div className={styles.container}>
      {leagues.map((league, index) => (
        <League
          league={league}
          isActive={selectedLeague?.name === league.name}
          key={index}
          onClick={() => onSelectLeague(league)}
          leagueOrCup={leagueOrCup}
        />
      ))}
      {
        <League
          championsLeagueTeams={championsLeagueTeams}
          championsLeagueMatches={championsLeagueMatches}
          consoleChampionsLeagueMatches={() => consoleChampionsLeagueMatches()}
          // leagueOrCup={leagueOrCup}
        />
      }
    </div>
  );
}
