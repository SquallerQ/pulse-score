import styles from './Season.module.css';

type SeasonProps = {
  year: string;
  setSeason: (year: string) => void;
};

export function Season({ year, setSeason }: SeasonProps) {
  return (
    <div className={styles.container} onClick={() => setSeason(year)}>
      {year}
    </div>
  );
}
