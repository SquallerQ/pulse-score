import styles from './Season.module.css';

type SeasonProps = {
  year: string;
  setSeason: (year: string) => void;
  isActive: boolean;
};

export function Season({ year, setSeason, isActive }: SeasonProps) {
  return (
    <div className={styles.container} onClick={() => setSeason(year)} aria-pressed={isActive}>
      {year}
    </div>
  );
}
