import styles from './Table.module.css';

export function TableSkeleton() {
  const rows = Array.from({ length: 10 });

  return (
    <div className={`${styles.container} ${styles.skeletonContainer}`}>
      <div className={`${styles.header} ${styles.skeletonHeader}`}>
        <div className={`${styles.skeletonLine} ${styles.skeletonPosition}`}></div>
        <div className={styles.teamHeader}>
          <div className={`${styles.skeletonCircle} ${styles.skeletonLeagueEmblem}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonLeagueName}`}></div>
        </div>
        <div className={`${styles.skeletonCircle} ${styles.skeletonStat}`}></div>
        <div className={`${styles.skeletonCircle} ${styles.skeletonStat}`}></div>
        <div className={`${styles.skeletonCircle} ${styles.skeletonStat}`}></div>
        <div className={`${styles.skeletonCircle} ${styles.skeletonStat}`}></div>
        <div className={`${styles.skeletonCircle} ${styles.skeletonPts}`}></div>
      </div>

      {rows.map((_, index) => (
        <div key={index} className={`${styles.row} ${styles.skeletonRow}`}>
          <div className={`${styles.skeletonLine} ${styles.skeletonPosition}`}></div>
          <div className={styles.team}>
            <div className={`${styles.skeletonCircle} ${styles.skeletonTeamLogo}`}></div>
            <div className={`${styles.skeletonLine} ${styles.skeletonTeamName}`}></div>
          </div>
          <div className={`${styles.skeletonLine} ${styles.skeletonCell}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonCell}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonCell}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonCell}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonCell}`}></div>
        </div>
      ))}
    </div>
  );
}
