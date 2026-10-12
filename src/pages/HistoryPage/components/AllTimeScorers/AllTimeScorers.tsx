import { useCompetitionAllTimeScorersQuery } from '../../../../features/history/queries/useCompetitionAllTimeScorersQuery';
import { HistoryQueryState } from '../HistoryQueryState/HistoryQueryState';
import styles from './AllTimeScorers.module.css';

export function AllTimeScorers() {
  const { allTimeScorersQuery } = useCompetitionAllTimeScorersQuery();

  if (allTimeScorersQuery.isPending && !allTimeScorersQuery.data) {
    return <HistoryQueryState state="loading" />;
  }

  if (allTimeScorersQuery.isError) {
    return <HistoryQueryState state="error" error={allTimeScorersQuery.error} />;
  }

  if (!allTimeScorersQuery.data) {
    return <HistoryQueryState state="empty" />;
  }

  const { competitionCode, scorers } = allTimeScorersQuery.data;

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Historical records</span>
        <h1 className={styles.title}>{competitionCode} All-Time Scorers</h1>
        <p className={styles.description}>The players with the most goals in the competition's history.</p>
      </header>

      {scorers.length > 0 ? (
        <div className={styles.list}>
          {scorers.map((scorer) => (
            <article key={`${scorer.place}-${scorer.playerName}`} className={styles.row}>
              <span className={styles.rank}>{scorer.place}</span>
              <strong className={styles.playerName}>{scorer.playerName}</strong>
              <span className={styles.clubName}>{scorer.clubName}</span>
              <span className={styles.goals}>{scorer.goals} goals</span>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyMark}>10</span>
          <h2>Records are coming soon</h2>
          <p>All-time scoring data for this competition has not been added yet.</p>
        </div>
      )}
    </section>
  );
}
