import styles from './League.module.css';

type League = {
  id: number;
  country: string;
  flag: string;
  name: string;
  emblem: string;
};
type LeagueProps = {
  league: League;
  isActive: boolean;
  onClick: () => void;
};
export function League({ league, isActive, onClick }: LeagueProps) {
  return (
    <div className={styles.container}>
      <button type="button" onClick={onClick} aria-pressed={isActive}>
        <img className={styles.images} src={league.emblem} alt={league.name} />
      </button>
    </div>
  );
}
