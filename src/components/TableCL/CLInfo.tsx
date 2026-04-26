import styles from './CLInfo.module.css';

export function CLInfo() {
  return (
    <aside className={styles.container}>
      <h3 className={styles.title}>How The New Champions League Works</h3>

      <p className={styles.paragraph}>
        The tournament now starts with a single <strong>league phase</strong>. All teams are ranked in one shared table
        instead of separate groups.
      </p>
      <p className={styles.paragraph}>
        Each club plays <strong>8 matches</strong> against 8 different opponents (4 home, 4 away). Points are standard:
        3 for a win, 1 for a draw, 0 for a loss.
      </p>

      <h4 className={styles.subTitle}>Table Colors</h4>
      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <span className={styles.progressTop}></span>
          <span className={styles.progressPlayoff}></span>
          <span className={styles.progressOut}></span>
        </div>
        <div className={styles.progressLabels}>
          <span>1-8</span>
          <span>9-24</span>
          <span>25-36</span>
        </div>
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.boxTop}></span>
          <span>Places 1-8: direct qualification to the Round of 16</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.boxPlayoff}></span>
          <span>Places 9-24: knockout play-off round</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.boxOut}></span>
          <span>Places 25-36: eliminated from European competition</span>
        </div>
      </div>

      <h4 className={styles.subTitle}>Play-Offs And Knockout Stage</h4>
      <p className={styles.paragraph}>
        Teams ranked 9-24 play two-legged ties to reach the Round of 16, where they join the top 8.
      </p>
      <p className={styles.paragraph}>
        From there, ties are played over two legs until the final. If aggregate score is level, games go to extra time
        and then penalties if needed. The final is a single match at a neutral venue.
      </p>
    </aside>
  );
}
