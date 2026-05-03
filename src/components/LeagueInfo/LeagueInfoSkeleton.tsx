import styles from './LeagueInfo.module.css';

export function LeagueInfoSkeleton() {
  return (
    <div className={`${styles.container} ${styles.skeletonContainer}`}>
      <div className={styles.content}>
        <div className={`${styles.championContainer} ${styles.skeletonCard}`}>
          <div className={`${styles.skeletonCircle} ${styles.skeletonChampionLogo}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonChampionLabel}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonChampionName}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonChampionPoints}`}></div>
        </div>

        <div className={styles.middleColumn}>
          <div className={styles.middleHeader}>
            <div className={`${styles.leagueMeta} ${styles.skeletonMeta}`}>
              <div className={`${styles.skeletonCircle} ${styles.skeletonLeagueLogo}`}></div>
              <div className={styles.skeletonMetaText}>
                <div className={`${styles.skeletonLine} ${styles.skeletonMetaLabel}`}></div>
                <div className={`${styles.skeletonLine} ${styles.skeletonMetaTitle}`}></div>
              </div>
            </div>
          </div>

          <div className={`${styles.section} ${styles.snapshotCard} ${styles.skeletonCard}`}>
            <div className={`${styles.skeletonLine} ${styles.skeletonSectionTitle}`}></div>
            <div className={styles.snapshotList}>
              <div className={styles.snapshotRow}>
                <div className={`${styles.skeletonLine} ${styles.skeletonSnapshotLabel}`}></div>
                <div className={`${styles.skeletonLine} ${styles.skeletonSnapshotValue}`}></div>
              </div>
              <div className={styles.snapshotRow}>
                <div className={`${styles.skeletonLine} ${styles.skeletonSnapshotLabel}`}></div>
                <div className={`${styles.skeletonLine} ${styles.skeletonSnapshotValue}`}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.section} ${styles.topThreeSection} ${styles.skeletonCard}`}>
          <div className={`${styles.skeletonLine} ${styles.skeletonSectionTitle}`}></div>
          <div className={styles.podium}>
            <div className={`${styles.teamCard} ${styles.firstPlace} ${styles.skeletonCard}`}></div>
            <div className={`${styles.teamCard} ${styles.secondPlace} ${styles.skeletonCard}`}></div>
            <div className={`${styles.teamCard} ${styles.thirdPlace} ${styles.skeletonCard}`}></div>
          </div>
        </div>

        <div className={`${styles.section} ${styles.topScorersSection} ${styles.skeletonCard}`}>
          <div className={`${styles.skeletonLine} ${styles.skeletonSectionTitle}`}></div>
          <div className={styles.topScorersContainer}>
            <div className={`${styles.topScorer} ${styles.skeletonRow}`}></div>
            <div className={`${styles.topScorer} ${styles.skeletonRow}`}></div>
            <div className={`${styles.topScorer} ${styles.skeletonRow}`}></div>
          </div>
        </div>

        <div className={styles.timelineColumn}>
          <div className={styles.timelineBadge}>
            <div className={`${styles.seasonBadge} ${styles.skeletonBadge}`}></div>
          </div>

          <div className={`${styles.section} ${styles.timelineCard} ${styles.skeletonCard}`}>
            <div className={`${styles.skeletonLine} ${styles.skeletonSectionTitle}`}></div>
            <div className={styles.timelineList}>
              <div className={`${styles.skeletonLine} ${styles.skeletonTimelineRow}`}></div>
              <div className={`${styles.skeletonLine} ${styles.skeletonTimelineRow}`}></div>
              <div className={`${styles.skeletonLine} ${styles.skeletonTimelineRow}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
