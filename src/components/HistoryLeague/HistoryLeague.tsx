import styles from './HistoryLeague.module.css';

type League = {
  code: string;
  country: string;
  emblem: string;
  flag: string;
  id: number;
  name: string;
};

type HistoryLeagueProp = {
  league: League;
  setLeagueCode: (league: string) => void;
};

export function HistoryLeague({ league, setLeagueCode }: HistoryLeagueProp) {
  console.log(league);

  return (
    <div onClick={() => setLeagueCode(league.code)}>
      <img className={styles.leagueEmblem} src={league.emblem} alt={league.name} />
      {league.name}
    </div>
  );
}
