import styles from './TeamList.module.css';

export function TeamListSkeleton() {
  return (
    <div className={`${styles.container} ${styles.skeletonContainer}`}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={styles.teamSkeletonCard}></div>
      ))}
    </div>
  );
}
