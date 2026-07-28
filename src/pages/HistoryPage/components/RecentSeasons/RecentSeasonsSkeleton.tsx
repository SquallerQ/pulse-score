import styles from './RecentSeasonsSkeleton.module.css';

export function RecentSeasonsSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.yearsContainer}>
        <div className={styles.yearsContainerInner}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.yearPill}></div>
          ))}
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.summaryColumn}>
          <div className={styles.summaryEyebrow}></div>
          <div className={styles.summaryTitle}></div>

          <div className={styles.podiumCard}></div>
          <div className={styles.podiumCard}></div>
          <div className={styles.podiumCard}></div>
        </div>

        <div className={styles.scorersGrid}>
          <div className={styles.scorersColumn}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.scorerRow}></div>
            ))}
          </div>

          <div className={styles.scorersColumn}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.scorerRow}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
