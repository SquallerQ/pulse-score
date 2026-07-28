import styles from './HistoryPageSkeleton.module.css';

export function HistoryPageSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.currentLeagueCard}></div>
        <div className={styles.leaguesList}></div>
      </div>

      <div className={styles.tabsRow}>
        <div className={styles.tabPill}></div>
        <div className={styles.tabPill}></div>
      </div>
    </div>
  );
}
