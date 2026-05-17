import styles from './League.module.css';
import championLeagueLogo from '../../../assets/champ-league-logo.svg';
import plLeague from '../../../assets/pl-league-logo-league-list.svg';

type LeagueItem = {
  id: number;
  country: string;
  flag: string;
  name: string;
  emblem: string;
};

type LeagueProps = {
  mode: 'league' | 'cup';
  league?: LeagueItem | undefined;
  isActive?: boolean;
  onSelectLeague?: () => void;
  onSelectCup?: () => void;
};

const PLName = 'Premier League';

export function League({ mode, league, isActive, onSelectLeague, onSelectCup }: LeagueProps) {
  {
    return mode === 'cup' ? (
      <div className={styles.container}>
        <button className={styles.button} type="button" onClick={onSelectCup} aria-pressed={isActive}>
          <img className={styles.images} src={championLeagueLogo} alt="Champions League" />
        </button>
      </div>
    ) : (
      <div className={styles.container}>
        <button className={styles.button} type="button" onClick={onSelectLeague} aria-pressed={isActive}>
          <img className={styles.images} src={league?.name === PLName ? plLeague : league?.emblem} alt={league?.name} />
        </button>
      </div>
    );
  }
}
