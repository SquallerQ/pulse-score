import styles from './League.module.css';

type LeagueItem = {
  id: number;
  country: string;
  flag: string;
  name: string;
  emblem: string;
};

type championsLeagueItem = {
  id: number;
  // flag: string;
  name: string;
  emblem: string;
};

type LeagueProps = {
  league?: LeagueItem | undefined;
  championsLeagueTeams?: championsLeagueItem | undefined;
  championsLeagueMatches?: championsLeagueItem | undefined;
  isActive?: boolean;
  onClick?: () => void;
  leagueOrCup?: string;
};

export function League({
  league,
  isActive,
  onClick,
  championsLeagueMatches,
  championsLeagueTeams,
  consoleChampionsLeagueMatches,
}: LeagueProps) {
  // console.log(championsLeague?.emblem);

  {
    return championsLeagueTeams ? (
      <div className={styles.container}>
        <button type="button" onClick={consoleChampionsLeagueMatches} aria-pressed={isActive}>
          <img className={styles.images} src={championsLeagueTeams?.emblem} alt={championsLeagueTeams?.name} />
        </button>
      </div>
    ) : (
      <div className={styles.container}>
        <button type="button" onClick={onClick} aria-pressed={isActive}>
          <img className={styles.images} src={league?.emblem} alt={league?.name} />
        </button>
      </div>
    );
  }
}
