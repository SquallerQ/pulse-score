import styles from './CLInfo.module.css';

export function CLInfoSkeleton() {
  return (
    <aside className={`${styles.container} ${styles.skeletonContainer}`}>
      <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`}></div>

      <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`}></div>
      <div className={`${styles.skeletonLine} ${styles.skeletonParagraphShort}`}></div>

      <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`}></div>
      <div className={`${styles.skeletonLine} ${styles.skeletonParagraphShort}`}></div>

      <div className={`${styles.skeletonLine} ${styles.skeletonSubTitle}`}></div>

      <div className={styles.skeletonProgressWrap}>
        <div className={`${styles.skeletonBlock} ${styles.skeletonProgressBar}`}></div>
        <div className={styles.skeletonProgressLabels}>
          <div className={`${styles.skeletonLine} ${styles.skeletonProgressLabel}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonProgressLabel}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonProgressLabel}`}></div>
        </div>
      </div>

      <div className={styles.skeletonLegend}>
        <div className={styles.skeletonLegendItem}>
          <div className={`${styles.skeletonBlock} ${styles.skeletonBox}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonLegendText}`}></div>
        </div>
        <div className={styles.skeletonLegendItem}>
          <div className={`${styles.skeletonBlock} ${styles.skeletonBox}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonLegendText}`}></div>
        </div>
        <div className={styles.skeletonLegendItem}>
          <div className={`${styles.skeletonBlock} ${styles.skeletonBox}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonLegendText}`}></div>
        </div>
      </div>

      <div className={`${styles.skeletonLine} ${styles.skeletonSubTitle}`}></div>
      <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`}></div>
      <div className={`${styles.skeletonLine} ${styles.skeletonParagraph}`}></div>
      <div className={`${styles.skeletonLine} ${styles.skeletonParagraphShort}`}></div>
    </aside>
  );
}
